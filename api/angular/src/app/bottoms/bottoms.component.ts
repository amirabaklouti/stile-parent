import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { FootwearComponent } from '../footwear/footwear.component';
import { Cloth } from '../model/cloth';
import { ClothesService } from '../_services/clothes.service';
import { OutfitService } from '../_services/outfit.service';

@Component({
  selector: 'app-bottoms',
  templateUrl: './bottoms.component.html',
  styleUrls: ['./bottoms.component.scss'],
})
export class BottomsComponent implements OnInit {
  bottoms:Cloth[]=[]
  //@Input('Top') Top
  @Input('name') name
  @Input('outfitId') outfitId

  id:number;

  @Input('Images')Images:any[]

  outfitName

  completed =false;

  constructor(private  router : Router , private outfitService :OutfitService , private loadingController : LoadingController,private modalCtrl: ModalController,private toastController:ToastController, private clothesService:ClothesService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if(this.name!==undefined){
      this.outfitName = this.name
    }
    //  this.getAllBottoms();
    this.preProcessed();
      }
      dismiss(){
        this.modalCtrl.dismiss()
        console.log(this.Images)
      }

      preProcessed(){
        for (let i = 0; i < this.Images.length; i++) {
          this.Images[i].processed = false  
        }
    
      }

      ItemActiveInOutfit(image){
        if(image.processed==false){
          image.processed = true ;
        }else{
          image.processed = false ;
        }
      }





      async processOutfit() {
        const loading = await this.loadingController.create({
          spinner: 'crescent',
          duration: 1000,
          mode :'ios',
          message: 'Please wait...',
          translucent: true,
          cssClass: 'custom-class custom-loading'
        });
        return await loading.present().then(undefined=>{
         this.completed = true
        });
      this.saveOutfit();
    
      }
   saveOutfit(){
     if(this.outfitId==undefined){
     let Items = [] ;
     for (let i = 0; i < this.Images.length; i++) {
       if (this.Images[i].processed == true) {
        Items.push(this.Images[i])
    
       }
     }
     var outfitName = {outfitName: this.outfitName};
     Items.push(outfitName)
     this.outfitService.addOutfit(Items).subscribe(data =>{});
     this.router.navigateByUrl('/outfits')
     this.modalCtrl.dismiss();
     }else{
  
      let Items = [] ;
      for (let i = 0; i < this.Images.length; i++) {
        if (this.Images[i].processed == true) {
         Items.push(this.Images[i])
     
        }
      }
      var outfitName = {outfitName: this.outfitName};
      Items.push(outfitName)
      this.outfitService.modifyOutfitItems(Items,this.outfitId).subscribe(data =>{});
      this.modalCtrl.dismiss();
      this.router.navigateByUrl('/outfits')
     
     }

   }

      newOutfit(){
        this.completed = false
      }










/*  setBottom(event){
    this.id=event;
   
  //  console.log(this.id)
  }

  getAllBottoms(){
    this.clothesService.getAllBottoms().subscribe(clothes => {this.bottoms=clothes;
      this.bottoms.forEach(cloth => {
        if (cloth.imgUri)
          cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
      })})
  }
  clothSearch(event){
    const val = event.target.value;
    console.log(val)
    this.bottoms=[]
      if (val && val.trim() != '')
        this.clothesService.searchClothes(val.toLowerCase()).subscribe(clothesList => {
          clothesList.forEach(e => {if((e.category.id==2)||(e.category.id==3)){
            this.bottoms.push(e);    
          }})
          this.bottoms.forEach(cloth => {
            if (cloth.imgUri)
              cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
          })
          console.log(clothesList)
          console.log(clothesList)
        })
      else {
        this.getAllBottoms();
      }
  }
  async chooseFootwear() {
    const presentModel = await this.modalCtrl.create({
      component: FootwearComponent,
      showBackdrop: true,
      mode: "ios",
      componentProps: {'Top':this.Top, 'Bottom': this.id }
    });

    return await presentModel.present();
  }
  next(){
    if(this.id){
      this.chooseFootwear();
    }
    else{
      this.submitRequestFailed()
    }
  }
  async submitRequestFailed(){
    const toast = await this.toastController.create({
      message: 'Please select a bottom!',
      duration: 2000
    });
    toast.present();
  }*/



}
