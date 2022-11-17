import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertUser } from '../model/alert';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  notifications:AlertUser[]=[]


  imgUri
  
 /* checkNotification(){
    this.alertService.getAlerts().subscribe(alerts => {let last=alerts.pop()
    if(this.booleanCompare(last.read,true)){
      this.alertService.notificationRead=false;
    }})
  }
  booleanCompare(a: boolean, b: boolean) {
    return Number(a) - Number(b);}
*/
public folder: string;
  async OpenModel() {
    const presentModel = await this.modalCtrl.create({
      component: NotificationsComponent,
      showBackdrop: true,
      mode: "ios",
      cssClass: 'notifications'
    });

    presentModel.onWillDismiss().then((data) => {
    //  console.log(data);
    //  debugger
   //   this.alertService.checkNotification();

    });

    return await presentModel.present();
  }
  
  

  constructor(private router : Router , private userService :UserService,private modalCtrl: ModalController,public alertService:AlertService ,private activatedRoute: ActivatedRoute) { }

  ngOnInit() { 
    if(localStorage.getItem('profileImg')){
      this.imgUri = JSON.parse(localStorage.getItem('profileImg'))

    }else{
      this.getUser()
      this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    }
  }

  getUser(){
    if(this.router.url !== '/login' && this.router.url !=='/signup' && this.router.url !=='/'){
      this.userService.getUserImg().subscribe((data:any) => {
      this.imgUri =data.profileImg
      localStorage.setItem('profileImg',JSON.stringify(this.imgUri))
    })
  }
  }
 /* getAlerts(){
    if(this.router.url !== '/login' && this.router.url !=='/signup' && this.router.url !=='/'){
    this.alertService.checkNotification();
  }
}*/

  ngOnDestroy(){
  //  debugger
  }
}
