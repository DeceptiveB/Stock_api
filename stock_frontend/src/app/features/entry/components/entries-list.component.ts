import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Entry } from "../models/entry.model";
import { EntryService } from "../services/entry.service";
import { ApiPageResponse } from "../../models/apipage.model";
import { response } from "express";
import { EntryItemComponent } from "./entry-item.component";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-entry-list',
    template: `
    <div>
        <div>
            <h1>Entries</h1>
        </div>
        @for (entry of entries; track entry.id) {
            <app-entry-item [entry]="entry"></app-entry-item>
        }
    </div>
    `,
    imports: [EntryItemComponent],
})

export default class EntryListComponent implements OnInit {
    entries:Entry[] = [];
    totalRecords: number = 0;

    constructor(private entryService: EntryService){}

    ngOnInit(): void {
        const page = 0;
        const size = 5;
        this.entryService.getEntries(page, size).subscribe({
            next: (response) => {
                console.log(response.content[0].quantity)
                this.entries = response.content
                console.log(this.entries[0].product)
            },
            error:  (error) => console.log(error)
            
        });
    }
}