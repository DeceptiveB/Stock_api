import { Component, Input, SimpleChanges } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { ProductService } from "../../product/services/product.service";
import { ProductListSelectItem } from "../models/product-list-select.model";

@Component({
    selector: 'app-category-select',
    template: `<ng-select 
                [items]="categoryList" 
                [formControl]="control"
                [multiple]="true"
                (change)="selectItem($event)" name="products" 
                (search)="changeCategoies($event)"
                bindValue="name"
                bindLabel="name"
                >
            </ng-select>`,
    styles: ``,
    imports: [NgSelectComponent, ReactiveFormsModule]
})

export default class CategoryMulti1SelectComponent {
    categoryList!: ProductListSelectItem[];
    @Input() control!: FormControl;
    @Input() productCategories!: ProductListSelectItem[];

    constructor(private prodService: ProductService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productCategories'] && this.productCategories) {
            this.categoryList = this.productCategories
            const categoriesNames = this.productCategories.map((x) => x.name)
            console.log(categoriesNames)
            this.control.setValue(categoriesNames);
        }
    }
    
    selectItem(items: ProductListSelectItem[]) {
        console.log(items)
        const catNames = items.map((x) => x.name)
        this.control.setValue(catNames);
    }

    changeCategoies(event: {term: string;items: any[]}) {
        const catName = event.term;
        if(catName.length > 1) {
            this.prodService.getProductsByName(catName).subscribe({
                next: (response) => {
                    console.log(response)
                    this.categoryList = response
                },
                error: (error) => console.log('Request failed', error)
            });
        }
    }
}