import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BrandListItem } from "../models/brand-list-item.model";

@Injectable({ providedIn: 'root' })
export class BrandService {
    private apiUrl = "http://localhost:8080";

    constructor(private readonly http: HttpClient) { }

    getBrandsByName(name: string) {
        var apiUrl = this.apiUrl + `/api/brand?name=${name}`;

        return this.http.get<BrandListItem[]>(apiUrl);
    }
}