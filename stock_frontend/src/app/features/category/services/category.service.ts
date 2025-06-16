import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    //private apiUrl = environment.apiUrl; // Use environment variable
    private apiUrl = "http://localhost:8080"; // Use environment variable


    constructor(private readonly http: HttpClient) { }

    getCategoriesByName(name: string) {
        var apiUrl = this.apiUrl + "/api/category?name="+name;
        return this.http.get<any>(apiUrl, {
            headers: { "Content-Type": "application/json" }
        })
    }

    saveCategory(name: string) {
        const data = {
            name: name
        }
        var apiUrl = this.apiUrl + "/api/category";
        return this.http.post(apiUrl, data, {
            headers: { "Content-Type": "application/json" }
        })
    }
}