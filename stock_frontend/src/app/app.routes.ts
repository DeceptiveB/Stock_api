import { Routes } from '@angular/router';
import EntryListComponent from './features/entry/components/entries-list.component';
import HomeComponent from './features/entry/pages/home/home.component';
import EditInsertEntryComponent from './features/entry/components/insert-edit-entry.component';
import EditInsertProductComponent from './features/product/components/insert-edit-product.component';
import ProductListComponent from './features/product/components/product-list.component';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => EntryListComponent,
    },
    {
        path: "entry/edit",
        loadComponent: () => EditInsertEntryComponent
    },
    {
        path: "product/edit",
        loadComponent: () => EditInsertProductComponent,
    },
    {
        path: "product/edit/:productId",
        loadComponent: () => EditInsertProductComponent,
    },
    {
        path: "product",
        loadComponent: () => ProductListComponent,
    }
];
