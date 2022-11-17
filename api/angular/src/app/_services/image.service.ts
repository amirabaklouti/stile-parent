import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../model/image';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  getImages(): Observable<Image[]> {
    return this.httpClient
      .get<Image[]>(API_PATH+'/images')
  }
  constructor(private httpClient:HttpClient) { }
}