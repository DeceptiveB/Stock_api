import { Component, Input } from "@angular/core";
import { ProductListItem } from "../models/product-list-item.model";

@Component({
    selector: 'app-product-list-item',
    styles: [],
    template: ``,
})

export default class ProductListItemComponent {
    @Input() product!:  ProductListItem;
}