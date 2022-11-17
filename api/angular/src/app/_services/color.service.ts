import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../model/color';
import { environment } from '../../environments/environment';
const API_PATH= environment.Path;
@Injectable({
  providedIn: 'root'
})
export class ColorService {
  getColors(): Observable<Color[]> {
    return this.httpClient
      .get<Color[]>(API_PATH+'/colors')
  }
  constructor(private httpClient:HttpClient) { }
}
