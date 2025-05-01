import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class BrandService {
    private apiUrl = "http://localhost:8080";

    constructor(private readonly http: HttpClient) { }

    getProductById(id: string) {
        var apiUrl = this.apiUrl + "/api/product/" + id;

        return this.http.get<BrandListItem[]>(apiUrl);

    }
}