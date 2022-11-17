import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../model/brand';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  getBrands(): Observable<Brand[]> {
    return this.httpClient
      .get<Brand[]>(API_PATH+'/brands')
  }
  constructor(private httpClient:HttpClient) { }
}
