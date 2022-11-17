import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cloth } from '../model/cloth';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Access-Control-Allow-Credentials' : 'true' })
};
@Injectable({
  providedIn: 'root'
})
export class CollectionService {







  constructor(private httpClient:HttpClient) { }

  changeItemCollection(id,collectionId) {
    return this.httpClient
    .post<Object>(API_PATH+'/users/changeItemCollection/'+id+'/'+collectionId,httpOptions)
  }

  changeItemToNewCollection(name,collectionId) {
    return this.httpClient
    .post<Object>(API_PATH+'/users/changeItemToNewCollection/'+name+'/'+collectionId,httpOptions)
  }


  checkItemExist(id: any) {
    return this.httpClient
    .get<Object>(API_PATH+'/users/checkItemExist/'+id,httpOptions)

  }

  addCollectionGroup(name) {
    return this.httpClient
    .post<Object>(API_PATH+'/users/addCollectionGroup/'+name,httpOptions)
  }


  addItemToCollection(id: any, name: any): Promise<Object>{
    return this.httpClient
      .post<Object>(API_PATH+'/users/addItemToCollection/'+id+'/'+name,httpOptions)
      .toPromise();
   }

   modifyCollectionGroupName(id,oldName,newName) {
    return this.httpClient
    .post<Object>(API_PATH+'/users/modifyCollectionGroupName/'+id+'/'+oldName+'/'+newName,httpOptions)

  }

   deleteCollectionGroup(id,name) {
    return this.httpClient
    .post<Object>(API_PATH+'/users/deleteCollectionGroup/'+id+'/'+name,httpOptions)

  }



   addCollectionGroupWithItem(name,clothId): Promise<Object>{
    return this.httpClient
      .post<Object>(API_PATH+'/users/addCollectionGroupWithItem/'+name+'/'+clothId,httpOptions)
      .toPromise();
   }

   getCollectionGroupByUser(){
    return this.httpClient
      .get(API_PATH+'/users/getCollectionGroupByUser',httpOptions)
   }

   deleteItemFromCollection(clothId) {
    return this.httpClient
    .post(API_PATH+'/users/deleteItemFromCollection/'+clothId,httpOptions)
  }
/*
  addToCollection(id): Promise<Object>{
    return this.httpClient
      .post<Object>('http://localhost:8080/api/users/collection/'+id,httpOptions)
      .toPromise();
  }
*/
  removeFromCollection(id): Promise<Object>{
    return this.httpClient
      .post<Object>(API_PATH+'/users/collection/remove/'+id,httpOptions)
      .toPromise();
  }
  checkCollectionStatus(id): Observable<boolean>{
    return this.httpClient
      .post<boolean>(API_PATH+'/users/collection/status/'+id,httpOptions)
  }


  findCollectionByUser(): Observable<Cloth[]> {
    return this.httpClient
    .get<Cloth[]>(API_PATH+'/users/collection/allByUser',httpOptions)
  }
  
}
