import { Component, OnInit ,OnDestroy} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { UserService } from '../_services/user.service';
import { Gesture, GestureController } from '@ionic/angular';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit , OnDestroy {
  profileImgSide='../../assets/defaultImg.png'
  isLoggedIn = false;
  username: string;

 
  moved = false

  
  constructor(private gestureCtrl: GestureController,private menu: MenuController,private router: Router, private userService :UserService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    if(this.router.url !== '/login' && this.router.url !=='/signup' && this.router.url !=='/'  && this.router.url !=='/profile'){
      if(localStorage.getItem('profileImgSide')){
        this.profileImgSide = JSON.parse(localStorage.getItem('profileImgSide'))
        this.username = JSON.parse(localStorage.getItem('profileName'))
        this.isLoggedIn=true
      }else{
        this.userService.getUserImg().subscribe((data:any) => {
          this.username = data.username
          this.profileImgSide = data.profileImg
          this.isLoggedIn=true
          localStorage.setItem('profileImg',JSON.stringify(this.profileImgSide))
          localStorage.setItem('profileName',JSON.stringify(this.username))
        })
      }
    }
  }

  menuOpened() {
    debugger
    console.log("mm")
    this.menu.enable(true, 'menu');
    this.menu.open('menu');
    this.moved =true;
  }


  triggerAnimation($event){
    var animation = $event.target.value;
    animation = parseFloat(animation);
  }
  ngOnDestroy(){
    //  debugger
    }
    ionViewWillEnter(){
    this.ngOnInit()
     }
     logOut(){
      sessionStorage.clear()
      localStorage.clear()
      this.router.navigateByUrl('/login')
     }
}
