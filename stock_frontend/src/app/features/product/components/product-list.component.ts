import { Component } from "@angular/core";
import ProductListItemComponent from "./product-list-item.component";
import { ProductListItem } from "../models/product-list-item.model";
import { ProductService } from "../services/product.service";
import { CommonModule } from "@angular/common";

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
            <table class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                @for (product of products; track $index) {
                        <tr app-product-list-item [product]="product"></tr>
                }
                </tbody>
            </table>
        </div>
        <div *ngIf="isEmpty">
            <h2>No hay resultados</h2>
        </div>
    </div>
    
    `,
    imports: [ProductListItemComponent, CommonModule]
})

export default class ProductListComponent{
    products!: ProductListItem[];
    loading = true
    isEmpty = false
    constructor(private productService: ProductService) {}

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