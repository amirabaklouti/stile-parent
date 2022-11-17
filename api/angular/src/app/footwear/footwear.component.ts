import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Cloth } from '../model/cloth';
import { ClothesService } from '../_services/clothes.service';
import { OutfitService } from '../_services/outfit.service';

@Component({
  selector: 'app-footwear',
  templateUrl: './footwear.component.html',
  styleUrls: ['./footwear.component.scss'],
})
export class FootwearComponent implements OnInit {
  @Input('outfit') outfit

  @Input('outfitName') outfitName
  
  Items = []
  constructor(private modalCtlr : ModalController, private clothesService: ClothesService,private toastController:ToastController,private sanitizer:DomSanitizer,private outfitService:OutfitService) { }

  ngOnInit() {
    this.getItems()
  }
getItems(){
  this.outfit.forEach(el => {
    if(el.cloth==undefined){this.Items.push(el.wardrobe)}
    if(el.wardrobe==undefined){this.Items.push(el.cloth)}
  });

}

  dismiss(){
    this.modalCtlr.dismiss()
  }
  /*
  footwear:Cloth[]=[]
  @Input('Top') Top
  @Input('Bottom') Bottom
  id:number;*/
 /* setFootwear(event){
    this.id=event
  }
  clothSearch(event){
    const val = event.target.value;
    console.log(val)
    this.footwear=[]
      if (val && val.trim() != '')
        this.clothesService.searchClothes(val.toLowerCase()).subscribe(clothesList => {
          clothesList.forEach(e => {if(e.category.id==4){
            this.footwear.push(e);    
          }})
          this.footwear.forEach(cloth => {
            if (cloth.imgUri)
              cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
          })
          console.log(clothesList)
          console.log(clothesList)
        })
      else {
       // this.getAllFootwear();
      }
  }*/
  /*getAllFootwear(){
    this.clothesService.getAllFootwear().subscribe(clothes => {this.footwear=clothes;
      this.footwear.forEach(cloth => {
        if (cloth.imgUri)
          cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
      })})
  }*/
  /*addOutfit(){
    if(this.id){
      this.outfitService.addOutfit(this.Top,this.Bottom,this.id).subscribe();
      location.reload();
    }
    else{
      this.submitRequestFailed()
    }
  }*/
  /*async submitRequestFailed(){
    const toast = await this.toastController.create({
      message: 'Please select a footwear!',
      duration: 2000
    });
    toast.present();
  }*/


}
