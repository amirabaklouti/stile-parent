import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials' : 'true' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {




  constructor(private httpClient: HttpClient) { }


  getUser() {
    return this.httpClient
  .get(API_PATH+'/users/getUser',httpOptions)
}

getUserImg() {
  return this.httpClient
  .get(API_PATH+'/users/getUserImg',httpOptions)
}

setUser(informations)
 {
  return this.httpClient.post(API_PATH+'/users/setUser/',informations,{ observe: 'response' })
 }

  addToFavorites(id): Promise<Object>{
    return this.httpClient
      .post<Object>(API_PATH+'/users/favorites/'+id,httpOptions)
      .toPromise();
  }

  removeFromFavorites(id): Promise<Object>{
    return this.httpClient
      .post<Object>(API_PATH+'/users/favorites/remove/'+id,httpOptions)
      .toPromise();
  }
  checkFavoriteStatus(id): Observable<boolean>{
    return this.httpClient
      .post<boolean>(API_PATH+'/users/favorites/status/'+id,httpOptions)
  }

  checkUserFirstLogin(id) {
    return this.httpClient
    .get<Object[]>(API_PATH+'/users/checkUserFirstLogin/'+id,httpOptions)
}

firstLoginSeen() {
  return this.httpClient
  .get(API_PATH+'/users/firstLoginSeen',httpOptions)
}

}