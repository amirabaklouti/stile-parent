import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {
  @Input() showBar: boolean = true;

  constructor(public alertService: AlertService,private router:Router) { }
  selectedPath = '';
  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
  }
  ngOnDestroy() {
  //  debugger
  //  this.alertService.checkNotification()
  }

}
