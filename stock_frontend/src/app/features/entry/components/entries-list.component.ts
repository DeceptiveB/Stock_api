import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Entry } from "../models/entry.model";
import { EntryService } from "../services/entry.service";
import { ApiPageResponse } from "../../../models/apipage.model";
import { response } from "express";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NgxDatatableModule, PageEvent } from "@swimlane/ngx-datatable";
import { RouterLink } from "@angular/router";
import EditInsertEntryComponent from "./insertEditEntryFormModal/insert-edit-entry.component";

@Component({
    selector: 'app-entry-list',
    template: `
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-6">
                <h1>Entries</h1>
            </div>
            <div class="col-md-6 text-md-end">
                <button 
                    type="button" 
                    (click)="modalEditEntry.show()" 
                    class="btn btn-success mt-2">New Entry</button>
            </div>
        </div>
        <hr>
        <div *ngIf="!isEmpty">
            <ngx-datatable
                class="ngx-datatable material"
                [rows]="entries"
                [columns]="[{ name: 'Name' }, { name: 'Description' }, { name: 'Brand' }]"
                [headerHeight]="50"
                [footerHeight]="50"
                rowHeight="auto"
                [externalPaging]="false"
                [count]="totalElements"
                [offset]="pageNumber"
                [limit]="pageSize"
                [externalPaging]="true"
                [columnMode]="'flex'"
                (page)="onPage($event)"
            >
            <!-- Name Column -->
                <ngx-datatable-column [flexGrow]="1" name="Id" prop="id">
                </ngx-datatable-column>
                <ngx-datatable-column [flexGrow]="2" name="Name" prop="product.name"></ngx-datatable-column>

                <ngx-datatable-column [flexGrow]="2" name="Quantity" prop="quantity"></ngx-datatable-column>

                <ngx-datatable-column [flexGrow]="1" name="Image" prop="product.image">
                    <ng-template let-value="value" ngx-datatable-cell-template #name>
                        <img src="{{value}}" class="w-100" alt="">
                    </ng-template>
                </ngx-datatable-column>

                <!-- Price Column -->
                <ngx-datatable-column [flexGrow]="1" name="Actions" [sortable]="false">
                    <ng-template let-row="row" let-rowIndex="rowIndex" ngx-datatable-cell-template>
                        <a routerLinkActive="router-link-active" [routerLink]="['/entry/edit', row.id]" class="btn btn-sm btn-primary me-2">Edit</a>
                    </ng-template>
                </ngx-datatable-column>
            </ngx-datatable>
        </div>
        
        <div *ngIf="isEmpty">
            <h2>No hay resultados</h2>
        </div>
    </div>
    <app-edit-entry
    #modalEditEntry>
    </app-edit-entry>
    `,
    imports: [CommonModule, NgxDatatableModule, RouterLink, EditInsertEntryComponent],
})

export default class EntryListComponent implements OnInit {
    entries:Entry[] = [];
    totalRecords: number = 0;
    isEmpty = false;
    totalElements = 0;
    pageNumber = 0;
    loading = true;
    pageSize = 0;

    constructor(private entryService: EntryService){}

    onPage(e: PageEvent) {

    }

    ngOnInit(): void {
        const page = 0;
        const size = 5;
        this.fetchData()
    }

    fetchData() {
        this.entryService.getEntries(this.pageNumber, this.pageSize).subscribe({
            next: (response) => {
                this.loading = false;
                this.totalElements = response.totalElements;
                this.pageNumber = response.page;
                this.pageSize = response.size;
                console.log(response.content[0].quantity)
                this.entries = response.content
                console.log(this.entries[0].product)
            },
            error:  (error) => {
                console.log(error)
                this.isEmpty = true
            } 
        });
    }
}