import { Component } from "@angular/core";
import ProductListItemComponent from "./product-list-item.component";
import { ProductListItem } from "../models/product-list-item.model";
import { ProductService } from "../services/product.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-product-list',
    styles: [],
    template: `
    <div *ngIf="loading">
        Cargando
    </div>
    <div *ngIf="!loading">
        <table class="table">
            <tbody>
            @for (product of products; track $index) {
                    <app-product-list-item [product]="product"/>
            }
            </tbody>
        </table>
    </div>
    `,
    imports: [ProductListItemComponent, CommonModule]
})

export default class ProductListComponent{
    products!: ProductListItem[];
    loading = true
    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
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
                this.loading = false;
            }
        })
    }
}