import { Component } from "@angular/core";
import ProductListItemComponent from "./product-list-item.component";
import { ProductListItem } from "../models/product-list-item.model";
import { ProductService } from "../services/product.service";
import { CommonModule } from "@angular/common";
import { NotificationService } from "../../../shared/components/toast/services/notification.service";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-product-list',
    styles: [],
    template: `
    <div class="container mt-5">
        <div>
            <h1 class="">Products</h1>
        </div>
        <hr>
        <div *ngIf="loading">
            Cargando resultados
        </div>
        <div *ngIf="!loading && !isEmpty">
            <!---<table datatable [dtOptions]="dtOptions" class="table">--->
            <!---    <thead>--->
            <!---        <tr>--->
            <!---            <th></th>--->
            <!---            <th>Name</th>--->
            <!---            <th>Brand</th>--->
            <!---            <th></th>--->
            <!---        </tr>--->
            <!---    </thead>--->
            <!---    <tbody>--->
            <!---    @for (product of products; track $index) {--->
            <!---            <tr app-product-list-item [product]="product"></tr>--->
            <!---    }--->
            <!---    </tbody>--->
            <!---</table>--->
            <ngx-datatable
                class="ngx-datatable material"
                [rows]="products"
                [columns]="[{ name: 'Name' }, { name: 'Description' }, { name: 'Brand' }]"
                [headerHeight]="50"
                [footerHeight]="50"
                rowHeight="auto"
                [externalPaging]="false"
                [count]="products.length"
                [offset]="1"
                [limit]="2"
                [columnMode]="'flex'"
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
        <div *ngIf="isEmpty">
            <h2>No hay resultados</h2>
        </div>
    </div>
    
    `,
    imports: [CommonModule, NgxDatatableModule, RouterLink]
})

export default class ProductListComponent {
    products!: ProductListItem[];
    loading = true
    isEmpty = false
    constructor(private productService: ProductService, private notificationService: NotificationService) { }

    ngOnInit(): void {
        const page = 0;
        const size = 5;
        this.productService.getAllProducts(page, size).subscribe({
            next: (response) => {
                this.loading = false;
                console.log(response.content)
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