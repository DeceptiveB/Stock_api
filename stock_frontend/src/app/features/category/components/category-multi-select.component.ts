import { Component, Input, SimpleChanges } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { CategoryListItem } from "../models/category-list-item.model";
import { CategoryService } from "../services/category.service";

@Component({
    selector: 'app-category-select',
    template: `<ng-select 
                [items]="categoryList" 
                [formControl]="control"
                [multiple]="true"
                (change)="selectItem($event)" name="categories" 
                (search)="changeCategoies($event)"
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

    constructor(private catService: CategoryService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['productCategories'] && this.productCategories) {
            this.categoryList = this.productCategories
            const categoriesNames = this.productCategories.map((x) => x.name)
            console.log(categoriesNames)
            this.control.setValue(categoriesNames);
        }
    }
    
    selectItem(items: CategoryListItem[]) {
        console.log(items)
        const catNames = items.map((x) => x.name)
        this.control.setValue(catNames);
    }

    changeCategoies(event: {term: string;items: any[]}) {
        const catName = event.term;
        if(catName.length > 1) {
            this.catService.getCategoriesByName(catName).subscribe({
                next: (response) => {
                    console.log(response)
                    this.categoryList = response
                },
                error: (error) => console.log('Request failed', error)
            });
        }
    }
}