import { Component, Input } from "@angular/core";
import { ProductListItem } from "../models/product-list-item.model";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
    selector: '[app-product-list-item]',
    styles: `
        .img-product {
            width: 120px;
        }

        .td-image {
            width: fit-content;
        }
    `,
    template: `
        <td class="td-image">
            <img class="img-product" src="{{ product.image }}" alt="">
        </td>
        <td>
            {{product.name}}
        </td>
        <td>
            {{ product.brand }}
        </td>
        <td>
            <a class="btn btn-primary" [routerLink]="['/product/edit', product.id]" routerLinkActive="router-link-active">Editar</a>
        </td>
    `,
    imports: [RouterLink]
})

export default class ProductListItemComponent {
    @Input() product!:  ProductListItem;
}