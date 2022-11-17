import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

const httpOptions = {
  headers: new HttpHeaders({ 
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials' : 'true'
 })
};
@Injectable({
  providedIn: 'root'
})
export class OutfitService {



/*  getAllOutfits(): Observable<Object[]> {
    return this.httpClient
      .get<Object[]>('http://localhost:8080/api/outfits/all')
  }
  addOutfit(topId,bottomId,footwearId): Observable<Object>{
    return this.httpClient
      .post<Object>('http://localhost:8080/api/outfits/add/'+topId+'/'+bottomId+'/'+footwearId,httpOptions)
  }
  removeOutfit(id): Observable<Object>{
    return this.httpClient
      .post<Object>('http://localhost:8080/api/outfits/remove/'+id,httpOptions)
  }
*/

getAllOutfits(): Observable<Object[]> {
  return this.httpClient
    .get<Object[]>(API_PATH+'/outfits/findOutfitsByUserId')
}

getOutfitItemsById(id) {
  return this.httpClient
  .get(API_PATH+'/outfits/getOutfitItemsById'+'/'+id ,httpOptions)
}

getOutfitsByUser() {
  return this.httpClient
    .get<Object[]>(API_PATH+'/outfits/getOutfitsByUser')
}

getAllUsersOutfits() {
  return this.httpClient
    .get<Object[]>(API_PATH+'/outfits/getAllUsersOutfits')
}

getNotJoinedWardrobesByUser() {
  return this.httpClient
    .get<Object[]>(API_PATH+'/outfits/getNotJoinedWardrobesByUser')
}

getWardrobesUsedInOutfitsByUser(wardrobeId) {
  return this.httpClient
    .get(API_PATH+'/outfits/getWardrobesUsedInOutfitsByUser/'+wardrobeId,httpOptions)
}

modifyOutfitItems(Items: any[], outfitId: any) {
  return this.httpClient
  .post<Object>(API_PATH+'/outfits/modifyOutfitItems/'+outfitId,Items,httpOptions)
}

  addOutfit(Items){
    return this.httpClient
      .post(API_PATH+'/outfits/add',Items,httpOptions)
  }

  deleteOutfit(id) {
    return this.httpClient
      .post(API_PATH+'/outfits/deleteOutfit',id,httpOptions)
  }

  modifyOutfitName(id,name) {
    return this.httpClient
      .post<Object>(API_PATH+'/outfits/modifyOutfitName/'+id+'/'+name,httpOptions)
  }
  
  constructor(private httpClient:HttpClient) { }
}
