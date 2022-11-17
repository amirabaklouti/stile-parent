import { formatDate } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { debug } from 'console';
import { element } from 'protractor';
import { Image } from '../model/image';
import { CacheService } from '../_services/cache.service';
import { ImageService } from '../_services/image.service';

@Component({
  selector: 'app-detected-clothes',
  templateUrl: './detected-clothes.component.html',
  styleUrls: ['./detected-clothes.component.scss'],
})
export class DetectedClothesComponent implements OnInit {
  /*clothes=[{name:"T-shirt",color: 'Blue',img:"../../assets/clothes/shirts/shirt2.svg"},{name:"Pants", color:"Blue", img:"../../assets/clothes/Pants/bluepants.jpg"}]*/
  element:Image;
  tab=[];
  detected:any;
  type:any;
  color:any;
  isChecked:boolean=false;
  getImages(){
    
    this.imageService.getImages().subscribe(elements => {
      elements.forEach(e => {
        if(e.detected==this.detected){
          this.element=e;
          this.tab=e.output;
          e.output.forEach(e =>{
          if (e.imgUri){
            e.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(e.imgUri)
          }
        } )
        }
      })})
    console.log(this.element);
  }
  constructor(private route:Router, private toastController:ToastController, private imageService: ImageService, private sanitizer:DomSanitizer,private router:ActivatedRoute) { }
  onSubmit(){
    if(this.isChecked){
      this.route.navigate(['/action', 'image'], { queryParams: {type: this.type ,color:this.color} });
    }
    else{
      this.submitRequestFailed();
    }
    
  }
  async submitRequestFailed(){
    const toast = await this.toastController.create({
      message: 'Please select an item!',
      duration: 2000
    });
    toast.present();
  }
  radioGroupChange(type,color){
    this.isChecked=true;
    this.type=type;
    this.color=color;
  }
  ngOnInit() {
    this.getImages();
    this.router.queryParams.subscribe(items => {
      this.detected=items.detected;
      console.log(this.detected)
    })
  }

}
