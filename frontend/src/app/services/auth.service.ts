import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:4000/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  resetPassword(email: string, password: string): Observable<any> {
    const user: string = this.storageService.getUser()
    httpOptions.headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': `Bearer ${user}`});
    console.log(httpOptions);
    return this.http.put(AUTH_API + 'resetPassword', {
      email,
      password
     }, httpOptions );
  }
}