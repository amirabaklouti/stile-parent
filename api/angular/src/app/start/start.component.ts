import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSlides, ModalController} from '@ionic/angular';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  @ViewChild('mySlider', { static: true }) slide: IonSlides;
  indx
  ticketService
  slides = [
          { img: "../assets/PlaceHolder1.svg", heading: "Get The Best Product", caption: "Browse into a variety of items from our numerous partners!" ,number:1},
          { img: "../assets/PlaceHolder2.svg", heading: "Great Experience with our Deals", caption: "No more endless searching and getting frustrated! Filter items according to YOUR needs!" ,number:2},
          { img: "../assets/PlaceHolder3.svg", heading: "Get Product at Best Prices", caption: "We'll keep you updated upon all sales matching your interest!" ,number:3}
        ]
       
        swipeNext(){ 
          this.slide.slideNext();
        }
        slideChanged() {
          this.indx = this.slide.getActiveIndex().then(index => {
            this.indx = index
         });
        }

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  Signup() {
    this.router.navigate(['/main']);
  }

  dismiss(){
 
   this.modalCtrl.dismiss();
  
  }
  constructor(private userService : UserService , private router: Router , private modalCtrl : ModalController) { }

  ngOnInit() {
   // debugger
    this.indx = this.slide.getActiveIndex().then(index => {
      this.indx = index
   });
   }

}
