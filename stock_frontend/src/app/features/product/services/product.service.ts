import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ApiPageResponse } from '../../models/apipage.model';
import { ProductRequest } from '../models/product-insert-request.model';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    //private apiUrl = environment.apiUrl; // Use environment variable
    private apiUrl = "http://localhost:8080"; // Use environment variable


    constructor(private readonly http: HttpClient) { }

    // Fetching a list of users (Array of objects)
    //   getEntries(page?: number, size?: number): Observable<ApiPageResponse<Entry[]>> {
    //     var apiUrl = this.apiUrl + "/api/entry";
    //     console.log("asdfasdf");

    //     let params = new HttpParams();

    //     if(page){
    //       params = params.append('page', page);
    //     }
    //     else {
    //       params = params.append('page', 0);
    //     }

    //     if(size){
    //       params = params.append('size', size);
    //     }
    //     else {
    //       params = params.append('size', 5);
    //     }
    //     return this.http.get<ApiPageResponse<Entry[]>>(apiUrl, {params});
    //   }

    insertProduct(req: ProductRequest): Observable<number> {
        const formData = new FormData();

        formData.append("image", req.image)
        formData.append("name", req.name)
        formData.append("description", req.description)
        formData.append("brand", req.brand)

        var apiUrl = this.apiUrl + "/api/entry";
        console.log("asdfasdf");

        return this.http.post<any>(apiUrl, formData, {
            reportProgress: true,
            observe: "events"
        }).pipe(
            map(event => this.getProgress(event)),
            catchError(this.handleError)
        );
    }

    private getProgress(event: HttpEvent<any>): number {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                return Math.round((event.loaded / (event.total ?? 1)) * 100);
            case HttpEventType.Response:
                console.log('File uploaded successfully:', event.body);
                return 100;
            default:
                return 0;
        }
    }
    private handleError(error: HttpErrorResponse): Observable<never> {
        console.error('Error uploading file:', error);
        return throwError(() => new Error('File upload failed. Please try again.'));
    }
}