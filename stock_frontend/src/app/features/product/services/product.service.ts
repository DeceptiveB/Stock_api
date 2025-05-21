import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ApiPageResponse } from '../../../models/apipage.model';
import { ProductRequest } from '../models/product-insert-request.model';
import { Product } from '../../entry/models/product.model';
import { ProductListItem } from '../models/product-list-item.model';

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
    getProductById(id: string){
        var apiUrl = this.apiUrl + "/api/product/"+id;

        return this.http.get<ProductListItem>(apiUrl);
          
    }
    getAllProducts(page: number, size: number){
        var apiUrl = this.apiUrl + "/api/product";

        let params = new HttpParams();
        if(page){
          params = params.append('page', page);
        }
        else {
          params = params.append('page', 0);
        }
    
        if(size){
          params = params.append('size', size);
        }
        else {
          params = params.append('size', 5);
        }

        return this.http.get<ApiPageResponse<ProductListItem[]>>(apiUrl, {params});
          
    }

    insertProduct(req: ProductRequest): Observable<HttpEvent<any>> {
        const formData = new FormData();

        const data = {
            name: req.name,
            brand: req.brand,
            description: req.brand,
            categories: []
        }
        formData.append("image", req.image);
        formData.append("data", JSON.stringify(data))

        var apiUrl = this.apiUrl + "/api/product";

        return this.http.post<any>(apiUrl, formData, {
            reportProgress: true,
            observe: "events"
        }).pipe(
            map(event => event),
            catchError(this.handleError)
        );
    }

    updateProduct(productId: null | string,req: ProductRequest): Observable<HttpEvent<any>> {
        const formData = new FormData();

        const data = {
            name: req.name,
            brand: req.brand,
            description: req.description,
            categories: req.categories
        }
        formData.append("image", req.image);
        formData.append("data", JSON.stringify(data))

        var apiUrl = this.apiUrl + "/api/product/"+productId;

        console.log(data)

        return this.http.put<any>(apiUrl, formData, {
            reportProgress: true,
            observe: "events"
        }).pipe(
            map(event => event),
            //catchError(this.handleError)
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