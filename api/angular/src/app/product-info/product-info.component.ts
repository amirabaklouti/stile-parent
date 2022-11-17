import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import { Cloth } from '../model/cloth';
import { TryClothComponent } from '../try-cloth/try-cloth.component';
import { ClothesService } from '../_services/clothes.service';
import { UserService } from '../_services/user.service';

import { ToastController } from "@ionic/angular";
import { CollectionService } from '../_services/collection.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { CollectionComponent } from '../collection/collection.component';
const sleep = (time: number) => {
  return new Promise(resolve => setTimeout(resolve, time));
};
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  @Input() cloth: any;
  @Input() fav : any;


  @Output() messageEvent = new EventEmitter<string>();
  checkDismiss=true
  message: string = "Hola Mundo!"

  inCart = false

  frontImgs = true  ; 



userCollections 
inputCollections
exist

addremove

  similarClothes=[];
 slideOptsFront = {
   slidesPerView: 1,
   centeredSlides: true,
   loop: true,
   beforeInit() {
    const swiper1 = this;

    swiper1.classNames.push(`${swiper1.params.containerModifierClass}coverflow`);
    swiper1.classNames.push(`${swiper1.params.containerModifierClass}3d`);

    swiper1.params.watchSlidesProgress = true;
    swiper1.originalParams.watchSlidesProgress = true;
  }
 }
 slideOptsBack = {
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  beforeInit() {
    const swiper2 = this;

    swiper2.classNames.push(`${swiper2.params.containerModifierClass}coverflow`);
    swiper2.classNames.push(`${swiper2.params.containerModifierClass}3d`);

    swiper2.params.watchSlidesProgress = true;
    swiper2.originalParams.watchSlidesProgress = true;
  }
}

 slideOpts2 = {
  slidesPerView: 3,
  coverflowEffect: {
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    beforeInit() {
      const swiper = this;

      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate() {
      const swiper = this;
      const {
        width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform$$1 = swiper.translate;
      const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate = params.depth;
      // Each slide offset from center
      for (let i = 0, length = slides.length; i < length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideSize = slidesSizesGrid[i];
        const slideOffset = $slideEl[0].swiperSlideOffset;
        const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

         let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        let translateZ = -translate * Math.abs(offsetMultiplier);

         let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

         // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;

         const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

         $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
        }
      }

       // Set correct perspective for IE10
      if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
        const ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = `${center}px 50%`;
      }
    },
    setTransition(duration) {
      const swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    }
  }
}

  dismiss() {
    if(this.router.url === '/collection'){
      this.messageEvent.emit(this.message)
    //  window.location.reload();
     this.modalCtrl.dismiss();
     this.router.navigateByUrl('/collection')
    }else{
      this.modalCtrl.dismiss();
    }
    
  }
  ionViewWillEnter(){
    if(localStorage.getItem(this.cloth.id)){
      this.inCart=true
     }else{
      this.inCart=false
     }
   }

  favoriteStatusChange(cloth) {
    this.userService.checkFavoriteStatus(cloth.id).subscribe((favorited) => { 

      if (favorited == true) {
        this.userService.removeFromFavorites(cloth.id);
        favorited = false;
      }
      else {
          this.userService.addToFavorites(cloth.id);
          favorited = true;
        }
      this.fav=favorited;
      debugger
    }
    )
    localStorage.removeItem('favorites')
    this.clothesService.findFavoritesByUser().subscribe((clothes:any) => {
      let arr = []
      clothes.forEach(element => {
        arr.push(element.id)
      });
     localStorage.setItem('favorites',JSON.stringify(clothes))
     localStorage.setItem('favoritesId',JSON.stringify(arr))
    })
  }
  /*TryCloth(){
    const cloth: NavigationExtras = {state: {cloth: this.cloth}}
    this.router.navigateByUrl('/try', cloth);
  }*/
  async TryClothModal() {
    const presentModel = await this.tryModalCtrl.create({
      component: TryClothComponent,
      showBackdrop: true,
      mode: "ios",
      componentProps: { 'cloth': this.cloth }
    });

    presentModel.onWillDismiss().then((data) => {

      //custom code
    })

    return await presentModel.present();
    
}
refresh(): void {
  window.location.reload();
}
  option = {
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 0.2,
    // autoplay:true,
  }
getClothes(){
  this.clothesService.getClothes().subscribe(clothes => 
    clothes.forEach(e=> {if((e.color.id==this.cloth.color.id)&&(e.category.id==this.cloth.category.id)&&(e.id!=this.cloth.id)){
      this.similarClothes.push(e);
    }}))
    
}
  constructor(private alertController :AlertController,private collectionService :CollectionService, private router :Router,private toaster: ToastController , private clothesService:ClothesService, private modalCtrl: ModalController,private tryModalCtrl:ModalController, private userService: UserService) { }
ngOnInit(): void {
  this.userCollections = []
  this.collectionService.getCollectionGroupByUser().subscribe(data=>
    this.userCollections = data)
    

  this.getClothes();

  this.exist = []
  this.collectionService.checkItemExist(this.cloth.id).subscribe((c)=>{
    this.exist = c
  if(this.exist.length==0){
    this.addremove = "Add To Collection"
  }else{
    this.addremove = "Remove From Collection"
  }

  })
  }
  FrontImages(){
  this.frontImgs =true
  
  }

  BackImages(){
    this.frontImgs =false
  }

    async presentModal(cloth) {
   //   debugger
    const modal = await this.modalCtrl.create({
      component: ImageViewerComponent,
      componentProps: { 
        cloth: cloth ,
      }
    });
    return await modal.present();
  }



   
  addItem(clothId){
 //   debugger
  //this.collectionService.addToCollection(clothId)
  }


  createCollectionInputs() {
    const theNewInputs = [];
    this.collectionService.getCollectionGroupByUser().subscribe(data=>
    this.userCollections = data)
     for (let i = 0; i < this.userCollections.length; i++) {
       
       theNewInputs.push(
         {
           type: 'radio',
           label: this.userCollections[i].collectionName,
           value: this.userCollections[i].id,
         }
       );
     }
     theNewInputs.push(
       {
         type: 'radio',
         label: '+ Add new Collection ',
         value: -1,
       });
    
     this.inputCollections =  theNewInputs;
   }



     presentAddToCollection(cloth){
      this.exist = []
      this.collectionService.checkItemExist(cloth.id).subscribe((c)=>{
        this.exist = c
     
    if(this.exist.length==0){
      this.createCollectionInputs();
      this.addItemToCollection(cloth);
 
  }
  else{
    this.notAdded(c);
  }
})
  }
 
 async addItemToCollection(cloth){
  let alert =  this.alertController.create({
    message: 'Select Collection',
    mode:"ios",
    inputs:  this.inputCollections,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: (data) => {  
          if(data!==-1){
            let Collection = []
            this.collectionService.addItemToCollection(data,cloth.id)
            this.addedToCollection(cloth.name);

             this.collectionService.getCollectionGroupByUser().subscribe((data:any)=> {
              for(let i = 0;i<data.length;i++) { 
                Collection = [...Collection, data[i]]; 
              }
              localStorage.setItem('collection',JSON.stringify(Collection))
            });

            this.addremove = "Remove From Collection"
         }
         if(data == -1){
           this.addNewCollection(cloth);
         } 

      }
    }
    ]
    
  });
   (await alert).present();  
 }



  async addNewCollection(cloth){
    const alert = await this.alertController.create({
    message: 'Please enter your Collection Name',
    mode:'ios',
    inputs: [
      {
        name: 'name',
        placeholder: 'Collection name...',
        type: 'textarea',

      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: (data) => {
          let Collection = []
          this.collectionService.addCollectionGroupWithItem(data.name,cloth.id)
          this.addedToCollection(cloth.name)

          this.collectionService.getCollectionGroupByUser().subscribe((data:any)=> {
            for(let i = 0;i<data.length;i++) { 
              Collection = [...Collection, data[i]]; 
            }
            localStorage.setItem('collection',JSON.stringify(Collection))
          });

          this.exist = []
          this.addremove = "Remove From Collection"
          this.collectionService.checkItemExist(this.cloth.id).subscribe((c)=>{
            this.exist = c})

        }
      }
      ]
  });
   await alert.present();
}



async addedToCollection(cloth){;
  const toast = await this.toaster.create({
    header: cloth + " added to your collection",
    position: "top",
    mode : 'ios',
    duration: 500,
    cssClass: "my-toast",
  /*  buttons: [{
      side: 'end',
      icon: 'star' ,
      handler: () => {
     //   this.router.navigateByUrl('/collection');
     //   this.modalCtrl.dismiss(); 
     this.openCollectionModal();
      }
  }],*/
  });

  await toast.present();
  


};

async openCollectionModal() {
  const modal = await this.modalCtrl.create({
    component: CollectionComponent,
    componentProps: { 
      back: true,
    }
  });
  modal.present();
}
async notAdded(collection){
  const alert = await this.alertController.create({
    message: collection[0].cloth.name +" is already in your collection .Do you want to remove it ?"  ,
    mode : 'ios',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.removeItem(collection[0].cloth.id)
        },
      },
    ],
  });

  await alert.present();
};

removeItem(id){
  if(this.exist.length==1){
    this.collectionService.deleteItemFromCollection(id).subscribe()
this.addremove = "Add To Collection"
  }

}

addItemToCart(cloth){
  if(!localStorage.getItem(cloth.id))
  {
    cloth.count = 1
    cloth.sum = cloth.price
    localStorage.setItem(cloth.id,JSON.stringify(cloth));
    this.inCart = true
  }else{
    localStorage.removeItem(cloth.id)
    this.inCart = false
  }
  
}
}
