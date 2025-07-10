import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';
import { environment } from '../../../../environment/environment';
import { ApiPageResponse } from '../../../models/apipage.model';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  //private apiUrl = environment.apiUrl; // Use environment variable
  private apiUrl = "http://localhost:8080"; // Use environment variable


  constructor(private readonly http: HttpClient) {}

  saveEntry(id: number, quantity: number) {
        const data = {
            product_id: id,
            quantity: quantity
        }
        var apiUrl = this.apiUrl + "/api/product";
        return this.http.post(apiUrl, data, {
            headers: { "Content-Type": "application/json" }
        })
    }

  // Fetching a list of users (Array of objects)
  getEntries(page?: number, size?: number): Observable<ApiPageResponse<Entry[]>> {
    var apiUrl = this.apiUrl + "/api/entry";
    console.log("asdfasdf");

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
    return this.http.get<ApiPageResponse<Entry[]>>(apiUrl, {params});
  }

  //insertEntry(): Observable<ApiPageResponse<Entry[]>> {
  //  var apiUrl = this.apiUrl + "/api/entry";
  //  console.log("asdfasdf");
  //  const formData = new FormData()
//
  //  return this.http.post<ApiPageResponse<Entry[]>>(apiUrl);
  //}
}