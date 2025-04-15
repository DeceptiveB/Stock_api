import { Component, Input } from "@angular/core";
import { ProductListItem } from "../models/product-list-item.model";

@Component({
    selector: 'app-product-list-item',
    styles: [],
    template: `
        <tr>
            <td>
                {{product.name}}
            </td>
            <td>
                {{ product.brand }}
            </td>
        </tr>
    `,
})

export default class ProductListItemComponent {
    @Input() product!:  ProductListItem;
}