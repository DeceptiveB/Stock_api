import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Entry } from "../models/entry.model";
import { EntryService } from "../services/entry.service";
import { HttpClient } from "@angular/common/http";

@Component(
    {
        selector: "app-entry-item",
        template: `
            <div>
                {{ entry.name }}
            </div>
        `,
    }
)

export class EntryItemComponent {
    @Input() entry!: Entry;
}