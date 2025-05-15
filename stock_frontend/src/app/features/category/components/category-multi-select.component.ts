import { Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { NgSelectComponent } from "@ng-select/ng-select";
import { CategoryListItem } from "../models/category-list-item.model";

@Component({
    selector: 'app-category-select',
    template: `<ng-select 
                [items]="categoryList" 
                [multiple]="true" 
                bindValue="name">
            </ng-select>`,
    styles: ``,
    imports: [NgSelectComponent, ReactiveFormsModule]
})

export default class CategoryMulti1SelectComponent {
    categoryList!: CategoryListItem[];
    @Input() control!: FormControl;
}