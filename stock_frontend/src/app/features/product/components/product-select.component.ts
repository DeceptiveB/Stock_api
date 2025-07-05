import { Component, Input, SimpleChanges } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { ProductService } from "../services/product.service";
import { ProductListSelectItem } from "../models/product-list-select.model";

@Component({
    selector: 'app-product-select',
    template: `<ng-select 
                [items]="productList" 
                [formControl]="control"
                (change)="selectItem($event)" name="product" 
                (search)="changeProduct($event)"
                bindValue="name"
                bindLabel="name"
                >
            </ng-select>`,
    styles: ``,
    imports: [NgSelectComponent, ReactiveFormsModule]
})

export default class ProductSelectComponent {
    productList!: ProductListSelectItem[];
    @Input() control!: FormControl;
    @Input() productItem!: ProductListSelectItem;

    constructor(private prodService: ProductService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['product'] && this.productItem) {
            console.log(this.productItem)
            this.productList = [this.productItem]
            this.control.setValue(this.productItem.name);
        }
    }
    
    selectItem(item: ProductListSelectItem):void {
        this.control.setValue(item.name);
    }

    changeProduct(event: {term: string;items: any[]}) {
        const prodName = event.term;
        if(prodName.length > 1) {
            this.prodService.getProductsByName(prodName).subscribe({
                next: (response) => {
                    console.log(response)
                    this.productList = response.content
                },
                error: (error) => console.log('Request failed', error)
            });
        }
    }
}