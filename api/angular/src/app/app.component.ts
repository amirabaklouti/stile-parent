import { Component } from '@angular/core';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  isLoggedIn = false;
  username: string;

  imgUri='../../assets/defaultImg.png'
  birthDate
  

  constructor(public router: Router,private userService :UserService) {
    defineCustomElements(window);
  }


  ngOnInit() {

  }
}

