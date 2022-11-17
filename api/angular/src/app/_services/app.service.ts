import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlertUser } from '../model/alert';

import { environment } from '../../environments/environment';
const API_PATH= environment.Path;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin': '*' })
};

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  getAlerts(): Observable<AlertUser[]> {
    return this.httpClient
      .get<AlertUser[]>(API_PATH+'/alerts')
  }
  updateAlertStatus(alertId):Observable<void>{
    return this.httpClient.post<void>(API_PATH+'/alerts/update/'+alertId,httpOptions)
  }
  constructor(private httpClient:HttpClient) { }
}
