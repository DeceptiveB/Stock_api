import { Component, Input, SimpleChanges } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { CategoryListItem } from "../models/category-list-item.model";

@Component({
    selector: 'app-category-select',
    template: `<ng-select 
                [items]="categoryList" 
                [formControl]="control"
                [multiple]="true"
                (change)="selectItem($event)" name="brand" 
                (search)="changeBrands($event)"
                bindValue="name"
                bindLabel="name"
                >
            </ng-select>`,
    styles: ``,
    imports: [NgSelectComponent, ReactiveFormsModule]
})

export default class CategoryMulti1SelectComponent {
    categoryList!: CategoryListItem[];
    @Input() control!: FormControl;
    @Input() productCategories!: CategoryListItem[];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productCategories'] && this.productCategories) {
            this.categoryList = this.productCategories
            const categoriesNames = this.productCategories.map((x) => x.name)
            
            console.log(categoriesNames)
            this.control.setValue(categoriesNames);
        }
    }
    
    selectItem(item: CategoryListItem ) {

    }

    changeBrands(event: {term: string;items: any[]}) {

    }
}