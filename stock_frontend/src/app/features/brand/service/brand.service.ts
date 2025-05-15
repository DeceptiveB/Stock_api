import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BrandListItem } from "../models/brand-list-item.model";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BrandService {
    private apiUrl = "http://localhost:8080";

    constructor(private readonly http: HttpClient) { }

    getBrandsByName(name: string) {
        var apiUrl = this.apiUrl + `/api/brand?name=${name}`;

        return this.http.get<BrandListItem[]>(apiUrl);
    }

    saveBrand(name: string) {
        const data = {
            name: name
        }
        var apiUrl = this.apiUrl + "/api/brand";

        return this.http.post<any>(apiUrl, data,
            {
                headers: { "Content-Type": "application/json" }
            });
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Error uploading file:', error);
        return throwError(() => new Error('File upload failed. Please try again.'));
    }
}