import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Entry } from "../models/entry.model";
import { EntryService } from "../services/entry.service";
import { ApiPageResponse } from "../../models/apipage.model";
import { response } from "express";
import { EntryItemComponent } from "./entry-item.component";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-entry-list',
    template: `
    <div class="container mt-5">
        <div>
            <h1>Entries</h1>
        </div>
        <hr>
        <div *ngIf="!isEmpty">
            @for (entry of entries; track entry.id) {
                <app-entry-item [entry]="entry"></app-entry-item>
            }
        </div>
        <div *ngIf="isEmpty">
            <h2>No hay resultados</h2>
        </div>
    </div>
    `,
    imports: [EntryItemComponent, CommonModule],
})

export default class EntryListComponent implements OnInit {
    entries:Entry[] = [];
    totalRecords: number = 0;
    isEmpty = false;

    constructor(private entryService: EntryService){}

    ngOnInit(): void {
        const page = 0;
        const size = 5;
        this.entryService.getEntries(page, size).subscribe({
            next: (response) => {
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