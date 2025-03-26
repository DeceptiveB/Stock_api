import { Routes } from '@angular/router';
import EntryListComponent from './features/entry/components/entries-list.component';
import HomeComponent from './features/entry/pages/home/home.component';
import EditInsertEntryComponent from './features/entry/components/insert-edit-entry.component';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => EntryListComponent,
    },
    {
        path: "entry/edit",
        loadComponent: () => EditInsertEntryComponent,
    }
];
