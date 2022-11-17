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
/*  getAlerts(): Observable<AlertUser[]> {
    return this.httpClient
      .get<AlertUser[]>(API_PATH+'/alerts')
  }
  updateAlertStatus(alertId):Observable<void>{
    return this.httpClient.post<void>(API_PATH+'/alerts/update/'+alertId,httpOptions)
  }
  notificationRead = true
  constructor(private httpClient:HttpClient) { }

  checkNotification(){
  //er
    this.getAlerts().subscribe(alerts => {
     let list = [] 
     list= alerts.filter(alert => this.booleanCompare(alert.read,true))
     if(list.length>0)
      this.notificationRead=false;
     else  
     this.notificationRead=true;
    /*  let last=alerts.pop()
    if(this.booleanCompare(last.read,true)){
      this.notificationRead=false;                */
 //   }else this.notificationRead=true;*/}) 
//  }
//  booleanCompare(a: boolean, b: boolean) {
//    return Number(a) - Number(b);} 
}
