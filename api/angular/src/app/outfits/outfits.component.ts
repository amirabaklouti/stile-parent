import { Component, ElementRef, OnDestroy, OnInit, Output, Renderer2, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EventEmitter } from 'stream';
import { FootwearComponent } from '../footwear/footwear.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { TopComponent } from '../top/top.component';
import { OutfitService } from '../_services/outfit.service';

//const panels = document.querySelectorAll(".panel");

export interface OutfitName {
  name: string;
}

@Component({
  selector: 'app-outfits',
  templateUrl: './outfits.component.html',
  styleUrls: ['./outfits.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OutfitsComponent implements OnInit , OnDestroy {

  
  //items

  modify = false
  outfits=[]
  detectedOutfit
  dataToShow = []
  wardrobe =[]
  collection = []
 // subscription : Subscription;
  slideOpts = {
    slidesPerView: 1,
  }
  slide = {
    slidesPerView: 2,
  }

  getItems(outfit){
    // this.items = []
    this.outfitService.getOutfitItemsById(outfit.id).subscribe((data : any) => 
      this.showOutfitItems(data,outfit.name)
  )
 
  }
  async showOutfitItems(items,name){
    const presentModel = await this.modalCtrl.create({
      component: FootwearComponent,
      componentProps: { 
        outfit: items ,
        outfitName :name
      },
      showBackdrop: true,
      mode: "ios",
    });

    return await presentModel.present();
  }
  getAllOutfits(){
    this.outfits = []
    this.outfitService.getOutfitsByUser().subscribe(data =>{
      for (let i = 0; i < data.length; i++) {
      this.outfits = [...this.outfits ,data[i]]
      }
      localStorage.setItem('outfits',JSON.stringify(this.outfits)) 
    })
   /* this.outfitService.getAllOutfits().subscribe(data =>
    { 
        this.outfits=data
      for (let i = 0; i < this.outfits.length; i++) {
      
        for (let j = 0; j < this.outfits[i].outfits.length; j++) {
          if(this.outfits[i].outfits[j].cloth == null){
            elements = [...elements,this.outfits[i].outfits[j].wardrobe]
        }
        if(this.outfits[i].outfits[j].wardrobe == null){
          elements = [...elements,this.outfits[i].outfits[j].cloth]
      }
     
        } 
        let arr =[]
        arr = [...arr,elements]
        arr.forEach(elements => {
        elements.name = this.outfits[i].name;
        elements.id = this.outfits[i].id;
        });
        this.dataToShow = [...this.dataToShow,elements]
        
      //  this.dataToShow.push(elements);
        elements = []
        arr = []

     //   console.log(ththis.dataToShow.length.outfitName.name)
      }
     
/*      this.outfits.forEach(cloth => {
        if (cloth.imgUri)
          cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
      })*/
    
  }
  
 /* removeOutfit(id:number){
    console.log(this.outfits)
    this.outfitService.removeOutfit(id).subscribe();
    location.reload();
  }*/

  constructor(private router : Router ,private alertController: AlertController, private elem: ElementRef,private outfitService: OutfitService, private sanitizer: DomSanitizer, private modalCtrl:ModalController ,private renderer : Renderer2) 
  {  }
  
  
  ngOnDestroy(): void {
 //   this.subscription.unsubscribe();
  }

  ngOnInit() {
  //  this.getAllOutfits();

 

  /* let i = 0; i < this.buttons.length; i++
    this.subscription = fromEvent(this.buttons[i], 'click').subscribe(e => {
      e.preventDefault();
   
    let j = 0; j < this.buttons.length; j++
      this.renderer.removeClass(this.buttons.item(j), 'active')
      this.renderer.addClass(e.currentTarget, 'active')
      debugger
    })*/


  }
  async openModal(cloth) {
    if(cloth.price){
      const presentModel = await this.modalCtrl.create({
        component: ImageViewerComponent,
        componentProps: { 
          cloth: cloth ,
        },
        showBackdrop: true,
        mode: "ios",
      });

      presentModel.onWillDismiss().then((data) => {  
      });
  
      return await presentModel.present();
    }
    if(!cloth.price){
    const presentModel = await this.modalCtrl.create({
      component: ImageViewerComponent,
      componentProps: { 
        wardrobe: cloth ,
        src: cloth.imgUri, 
      },
      showBackdrop: true,
      mode: "ios",
    });

    presentModel.onWillDismiss().then((data) => {  
    });

    return await presentModel.present();
    }

  }
  
  deleteOutfit(id,name){
    this.outfitWillDelete(id,name)

  }

  async outfitWillDelete(id,name){
    let alert = await this.alertController.create({
      message: 'are you sure to remove ' + name + ' ?',
      mode:"ios",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this.outfitService.deleteOutfit(id).toPromise().then(async () => {
                await  this.getAllOutfits();
              });
          }
          
      }
      ]  
    });
    alert.present();
  }

  ModifyOpen(name){
    this.modify = true
    this.detectedOutfit = name
  // 
  
  }
  closeModifyChange(){
    this.modify = false ;
    this.detectedOutfit = ''

  }

  modifyOutfitName(id,newName){
    this.outfitService.modifyOutfitName(id,newName).toPromise().then(async () => {
      await  this.getAllOutfits();
      });
    this.modify = false
  }



   editOutfitItems(outfit) {
    this.outfitService.getOutfitItemsById(outfit.id).subscribe((data : any)  =>{
      console.log(data)
     this.router.navigateByUrl('/top', { state: { cloths : data} });
    })
  /*   const modal = await this.modalCtrl.create({
       component: TopComponent,
       componentProps: { 
         cloths: cloths ,
         name: cloths.name
       }
     });
     modal.onDidDismiss().then( async (onClosedData) => {
        
      });
     return await modal.present();*/
   }
  ionViewWillEnter(){
    if(localStorage.getItem('outfits')){
      this.outfits = JSON.parse(localStorage.getItem('outfits'))
    }else{
      this.getAllOutfits();
    }  
   }


}
