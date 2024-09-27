import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../components/dashboard/dashboard.component';

const API_URL = 'http://localhost:4000/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPets(): Observable<any> {
    return this.http.get(API_URL + 'pets', { responseType: 'json' });
  }

  addPet(pet:Pet): Observable<any> {
    return this.http.post(API_URL + 'addPet', { responseType: 'json' });
  }
  
  deletePet(): Observable<any> {
    return this.http.delete(API_URL + 'deletePet', { responseType: 'json' });
  }
}