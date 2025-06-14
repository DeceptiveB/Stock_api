import { Component } from "@angular/core";
import ProductListItemComponent from "./product-list-item.component";
import { ProductListItem } from "../models/product-list-item.model";
import { ProductService } from "../services/product.service";
import { CommonModule } from "@angular/common";
import { NotificationService } from "../../../shared/components/toast/services/notification.service";
import { NgxDatatableModule, PageEvent } from '@swimlane/ngx-datatable';
import { RouterLink } from "@angular/router";
import { FormControl, FormsModule } from "@angular/forms";

@Component({
    selector: 'app-product-list',
    styles: [],
    template: `
    <div class="container mt-5">
        <div class="row">
            <div class="col-sm-6">
                <h1>Products</h1>
            </div>
            <div class="col-sm-6 text-sm-end d-flex">
                <a class="btn btn btn-success" [routerLink]="['/product/edit']">New  Product</a>
            </div>
        </div>
        <hr>
        <div *ngIf="loading">
            Cargando resultados
        </div>
        <div class="mb-4" *ngIf="!loading && !isEmpty">
            <div class="col-lg-2 mb-3">
                <select [(ngModel)]="pageSize" (change)="pageSelectChange()" class="form-select" name="" id="">
                     @for (item of [2,5,10,15]; track $index) {
                         <option [value]="item">{{ item }}</option>
                     }
                </select>
            </div>
            <ngx-datatable
                class="ngx-datatable material"
                [rows]="products"
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
                <ngx-datatable-column [flexGrow]="1" name="Id" prop="id"></ngx-datatable-column>
                <ngx-datatable-column [flexGrow]="1" name="Image" prop="image">
                    <ng-template let-value="value" ngx-datatable-cell-template #name>
                        <img src="{{value}}" class="w-100" alt="">
                    </ng-template>
                </ngx-datatable-column>
                <ngx-datatable-column [flexGrow]="2" name="Name" prop="name"></ngx-datatable-column>

                <!-- Price Column -->
                <ngx-datatable-column [flexGrow]="2" name="Description" prop="description"></ngx-datatable-column>
                <ngx-datatable-column [flexGrow]="1" name="Actions" [sortable]="false">
                    <ng-template let-row="row" let-rowIndex="rowIndex" ngx-datatable-cell-template>
                        <a routerLinkActive="router-link-active" [routerLink]="['/product/edit', row.id]" class="btn btn-sm btn-primary me-2">Edit</a>
                    </ng-template>
                </ngx-datatable-column>
            </ngx-datatable>
        </div>
    </div>
    
    `,
    imports: [CommonModule, NgxDatatableModule, RouterLink, FormsModule]
})

export default class ProductListComponent {
    products!: ProductListItem[];
    loading = true
    isEmpty = false
    totalElements = 0;
    pageNumber = 0;
    pageSize = 5;
    constructor(private productService: ProductService, private notificationService: NotificationService) { }

    ngOnInit(): void {
        this.fetchData()
    }

    onPage(e: PageEvent) {
        this.pageNumber = e.offset
        this.fetchData()
    }

    pageSelectChange() {
        console.log("Page size "+this.pageSize)
        this.fetchData()
    }

    fetchData(){
        this.productService.getAllProducts(this.pageNumber, this.pageSize).subscribe({
            next: (response) => {
                console.log("Total Elem "+this.totalElements)
                this.loading = false;
                console.log(response)
                this.totalElements = response.totalElements;
                this.pageNumber = response.page;
                this.pageSize = response.size;
                this.products = response.content;
            },
            error: (err) => {
                console.error('Error loading users', err);
                this.isEmpty = true;
                this.loading = false;
            }
        })
    }
}