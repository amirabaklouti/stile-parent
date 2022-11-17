import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as data from '../../assets/_productdb.json';
import { Cloth } from '../model/cloth';
import { Color } from '../model/color';


import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

const httpOptions = {
  headers: new HttpHeaders()
}

httpOptions.headers.append('Access-Control-Allow-Origin', '*');
httpOptions.headers.append('Content-Type', 'application/json');
@Injectable({
  providedIn: 'root'
})
export class ClothesService {


  searchClothesBywords(items) {
    return this.httpClient
    .post<Cloth[]>(API_PATH+'/clothes/searchClothesBywords',items,httpOptions)
  }
  database = data;
  clothes = this.database.clothes;
  getClothes(): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes', httpOptions)
  }
  imageSearch(type,color): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/image/'+type+'/'+color, httpOptions)
  }
  getClothById(id: Number) {
    return this.httpClient
      .get<Cloth>(API_PATH+'/clothes/id/' + id, httpOptions)
     
  }
  getClothIndex(id: number): Promise<Object> {
    return this.httpClient
      .get<Object>(API_PATH+'/clothes/index/' + id, httpOptions)
      .toPromise();
  }
  getClothesByCategory(category: String): Promise<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/category/' + category, httpOptions)
      .toPromise();
  }

  getClothesByCategoryId(id){
    return this.httpClient
      .get(API_PATH+'/clothes/getClothesByCategoryId/' + id, httpOptions)
    
  }

  getCountClothByCategory(): Promise<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/count/', httpOptions)
      .toPromise();
  }
  searchClothes(word,page): Observable<Cloth[]> {
    const size = 8
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/word/'+word+'/'+size+'/'+page, httpOptions)
  }
  filterByBrands(Brands: String[]): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/filter/brands/' + Brands, httpOptions)
      
  }
  combinedFilter(Brands: String[], colors: String[], min, max, discount:boolean): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/combinedFilter/' + Brands +'/' +colors +'/' +min +'/' +max +'/'+discount, httpOptions)
  }
  filterByPrice(min, max): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/filter/price/' + min + ',' + max, httpOptions)
      
  }
  filterByColor(colors: String[]): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/filter/color/' + colors, httpOptions)
  }
  findFavoritesByUser(): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/clothes/favorites', httpOptions)
  }

  /*
  getAllTops(): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/api/clothes/tops', httpOptions)
  }
  getAllBottoms(): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/api/clothes/bottoms', httpOptions)
  }
  getAllFootwear(): Observable<Cloth[]> {
    return this.httpClient
      .get<Cloth[]>(API_PATH+'/api/clothes/footwear', httpOptions)
  }*/
  
  constructor(private httpClient: HttpClient) { }
}
