import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { debug } from 'console';
import { listenerCount } from 'process';
import { AlertUser } from '../model/alert';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  notifications = []
  constructor(private modalCtrl: ModalController, public alertService: AlertService) { }
 /* dismiss() {
 //   debugger
    this.updateNotificationStatus();
  }
  notifications:AlertUser[]=[];
  /* getAlerts(){
    this.alertService.getAlerts().subscribe(alerts => this.notifications=alerts)
  } */
 /*
  booleanCompare(a: boolean, b: boolean) {
    return Number(a) - Number(b);}
  updateNotificationStatus(){
 //   debugger
    let list = []
    this.notifications.forEach(n => {if(!this.booleanCompare(n.read,false)){
  //    debugger
     list.push(n.alert.id)
    }
  })
  if(list.length>0){
    this.alertService.updateAlertStatus(list).subscribe(res => 
      this.modalCtrl.dismiss()
      );
  }
  else
    this.modalCtrl.dismiss()
  }
  */
  ngOnInit() {
 //   this.getAlerts();
   }
   dismiss(){
    this.modalCtrl.dismiss()
   }

}
