import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;


//const AUTH_API = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  
  login(credentials): Observable<any> {
    return this.http.post(API_PATH + '/auth/signin', {
    username: credentials.value.username,
    password: credentials.value.password
    }, httpOptions);
  }

 /* register(user): Observable<any> {
    return this.http.post(API_PATH + '/auth/signup', {
      username: user.value.username,
      email: user.value.email,
      password: user.value.password
    }, httpOptions);
  }*/
  register(user){
    return this.http.post(API_PATH + '/auth/signup', {
      username: user.value.username,
      email: user.value.email,
      password: user.value.password
    },httpOptions)}
    
}