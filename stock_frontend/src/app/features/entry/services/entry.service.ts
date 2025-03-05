import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entry } from '../models/entry.model';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl; // Use environment variable

  constructor(private http: HttpClient) {}

  // Fetching a list of users (Array of objects)
  getUsers(): Observable<Entry[]> {
    var apiUrl = this.apiUrl + "/api/entry";
    return this.http.get<Entry[]>(this.apiUrl);
  }
}