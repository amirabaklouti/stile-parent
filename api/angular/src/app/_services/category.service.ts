import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(API_PATH+'/categories')
  }
  searchCategory(word: string):Promise<Category[]>{
    return this.httpClient
      .get<Category[]>(API_PATH+'/categories/search/' + word)
      .toPromise();

  }


  constructor(private httpClient: HttpClient) { }
}
