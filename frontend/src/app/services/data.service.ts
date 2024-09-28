import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../components/dashboard/dashboard.component';
import { StorageService } from './storage.service';

const API_URL = 'http://localhost:4000/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private storageService:StorageService) {}

  getPets(): Observable<any> {
    const user: string = this.storageService.getUser()
    httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${user}`});
    console.log(httpOptions);
    return this.http.get(API_URL + 'pets', httpOptions);
  }

  addPet(pet:Pet): Observable<any> {
    const user: string = this.storageService.getUser()
    httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${user}`});
    console.log(httpOptions);
    return this.http.post(API_URL + 'addPet', {
      species: pet.species,
            name: pet.name,
            breed: pet.breed,
            age: pet.age,
            weight: pet.weight,
            altered: pet.altered,
            birthdate: pet.birthdate,
            adoptiondate: pet.adoptiondate,
    }, httpOptions);
  }
  
  deletePet(): Observable<any> {
    const user: string = this.storageService.getUser()
    httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${user}`});
    console.log(httpOptions);
    return this.http.delete(API_URL + 'deletePet', httpOptions);
  }
}