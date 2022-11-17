import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BottomsComponent } from '../bottoms/bottoms.component';
import { Cloth } from '../model/cloth';
import { ClothesService } from '../_services/clothes.service';
import { CollectionService } from '../_services/collection.service';
import { WardrobeService } from '../_services/wardrobe.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {

 // @Input('cloths')cloths:any
  cloths:any

  tops:Cloth[]=[]
  id:number;
  filterTerm;
  pictureCamera
  activeCollectionGroup = []
  myArray = [];
  alertTitle = '';
  myInputs = [];

  setTop(event){
    this.id=event;


  //  console.log(this.id)
  }

  @ViewChild('div') div: ElementRef;

selectedClothes =[];


  index ='wardrobe'
  userGroups 
  collectionSelected
  groupSelected
  collectionCategory =[]
  collectionGroups =[]
  values: string[] 

  /*getAllTops(){

    this.clothesService.getAllTops().subscribe(clothes => {this.tops=clothes;
      this.tops.forEach(cloth => {
        if (cloth.imgUri)
          cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
      })})
  }
  clothSearch(event){
    const val = event.target.value;
    console.log(val)
    this.tops=[]
      if (val && val.trim() != '')
        this.clothesService.searchClothes(val.toLowerCase()).subscribe(clothesList => {
          clothesList.forEach(e => {if(e.category.id==1){
            this.tops.push(e);    
          }})
          this.tops.forEach(cloth => {
            if (cloth.imgUri)
              cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
          })
          console.log(clothesList)
          console.log(clothesList)
        })
      else {
        this.getAllTops();
      }
  }*/

  handleChange(ev) {
    this.groupSelected = ev.target.value;

  }

  handleCollectionChange(ev) {
    this.activeCollectionGroup = []
    this.collectionSelected = ev.target.value;
    for (let i = 0; i < ev.target.value.collections.length; i++) {
      this.activeCollectionGroup.push(ev.target.value.collections[i].cloth) ;
      
    }
  }

  /*async chooseBottom() {
    const presentModel = await this.modalCtrl.create({
      component: BottomsComponent,
      showBackdrop: true,
      mode: "ios",
      componentProps: { 'Top': this.id }
    });

    return await presentModel.present();
  }*/
  async next(){
    if(this.cloths!==undefined){
         const presentModel = await this.modalCtrl.create({
      component: BottomsComponent,
      showBackdrop: true,
      mode: "ios",
      componentProps: { 
        outfitId : this.cloths.id,
        outfitName :this.cloths.name,
        Images: this.selectedClothes, 
      }
    });
    presentModel.onDidDismiss().then(async () => {
  
    });
    return await presentModel.present();
    }else{
    const presentModel = await this.modalCtrl.create({
     component: BottomsComponent,
     showBackdrop: true,
     mode: "ios",
     componentProps: { 
       Images: this.selectedClothes, 
     }
     
   });
   /*presentModel.onDidDismiss().then(async () => {
    
    this.modalCtrl.dismiss();
    this.router.navigateByUrl('/outfits')
  });*/

   return await presentModel.present();
   
    }
 
   
    
  /*  if(this.selectedClothes.length !=0){
      this.chooseBottom();
    }
    else{
      this.submitRequestFailed()
    }*/
  }
  async submitRequestFailed(){
    const toast = await this.toastController.create({
      message: 'Please select clothes!',
      duration: 2000
    });
    toast.present();
  }
  constructor(private router :Router,private elementRef:ElementRef, private alertController :AlertController ,private renderer: Renderer2,private wardrobeService : WardrobeService, private collectionService :CollectionService,private clothesService:ClothesService, private toastController:ToastController, private sanitizer: DomSanitizer, private modalCtrl:ModalController)
   { 
 
   }

  ngOnInit() {
  }
  ionViewWillEnter(){

    this.index = 'wardrobe'
 //   this.getAllTops()
 if(localStorage.getItem('collections')){
  this.collectionGroups = JSON.parse(localStorage.getItem('collections'))
}else{
  this.getCollection();
}
if(localStorage.getItem('wardrobes')){
  this.userGroups = JSON.parse(localStorage.getItem('wardrobes'))
}else{
  this.getUserGroups();
}



if(history.state.cloths !==undefined){ 
  this.cloths = []
  this.cloths = history.state.cloths
  history.state.cloths=[]
 }
  this.checkModify();
  }
  checkModify(){
    if(this.cloths!==undefined){
      this.cloths.forEach(el => {
        
        if(el.cloth!==null){
               el.TypeOfItem = 'collection' 
               el.added = true
               if(el.imgUri!==null && el.cloth!==undefined ){
                this.selectedClothes.push(el)
              }
        }
        if(el.cloth==null && el.cloth==undefined ){
          el.TypeOfItem = 'wardrobe' 
          el.added = true
        //  if(el.imgUri!==undefined){
            this.selectedClothes.push(el)
       //   }

        }
        console.log(this.selectedClothes)
      });
    //  this.selectedClothes.push(this.cloths)
      this.cloths.forEach(el => {
        const img: HTMLImageElement = this.renderer.createElement('img');
     if(el.TypeOfItem=="wardrobe"){
     img.src = el.wardrobe.imgUri
    }else{
      img.src = el.cloth.imgUri
     }
      img.className = 'addedImage';
      this.renderer.appendChild(this.div.nativeElement, img)
      });
    }
  }


  getCollection() {
    this.collectionService.getCollectionGroupByUser().subscribe((data:any[])=> {
      this.collectionGroups = data ;    
 /*   for (let i = 0; i < this.collection.length; i++){
      if( this.collectionCategory.includes(this.collection[i].category.name))
      {}
      else{
          this.collectionCategory.push(this.collection[i].category.name)
          this.values = this.collectionCategory;
      }
    }*/
  })
  }

  getUserGroups(){
    this.userGroups = []
    this.wardrobeService.checkGroupes().subscribe( data=>{
    this.userGroups = data  
    });
  }















  deleteItemFromSelected($event){
    const id = $event.currentTarget.id
    for (let i = 0; i < this.selectedClothes.length; i++) {
      if( this.selectedClothes[i].id==id){
        this.selectedClothes[i].removedFromList = true
        var el = document.getElementById(id);
      el.remove()
          this.selectedClothes.splice(i,1);
    }
  }
    
  }

  addItemToSelected(cloth){
    let used = false
    this.selectedClothes.forEach(element => {
   
      if(element.id ==cloth.id){used=true}
    });
    if(used==false){
    if(cloth.added == undefined || cloth.removedFromList==true){ 
    cloth.TypeOfItem = 'wardrobe'
    this.selectedClothes.push(cloth)
 
    const img: HTMLImageElement = this.renderer.createElement('img');
    img.className = 'addedImage';
    img.src = cloth.imgUri
    img.id = cloth.id
    this.renderer.listen(img, 'click', (event) => {
    this.deleteItemFromSelected(event); })
    this.renderer.appendChild(this.div.nativeElement, img)
      cloth.added = true
    }
  }
    if(cloth.added == true){
    } 
  }

  addCollectionToSelected(cloth){
    let used = false
    this.selectedClothes.forEach(element => {
      if(element.id ==cloth.id){used=true}
    });
    if(used==false){
    if(cloth.added == undefined || cloth.removedFromList==true){ 
      cloth.removedFromList=false
      cloth.TypeOfItem = 'collection'
      this.selectedClothes.push(cloth)
  
      const img: HTMLImageElement = this.renderer.createElement('img');
      img.src = cloth.imgUri
      img.className = 'addedImage';
      img.id = cloth.id
      const options = {
        selectedClothes: this.selectedClothes,
        }
        this.renderer.listen(img, 'click', (event) => {
          this.deleteItemFromSelected(event); })
      this.renderer.appendChild(this.div.nativeElement, img)
  

        cloth.added = true
      }
    }
      if(cloth.added == true){
   
      }
  }


  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
   
   this.pictureCamera = { imgUri :'data:image/'+image.format+';base64,'+image.base64String ,type :image.format, added :true, TypeOfItem:'native'}
  this.selectedClothes.push(this.pictureCamera)
  
    const img: HTMLImageElement = this.renderer.createElement('img');
    img.src = 'data:image/'+image.format+';base64,'+image.base64String
    img.className = 'addedImage';
    img.id = '-1'
    this.renderer.listen(img, 'click', (event) => {
      this.deleteItemFromSelected(event); })
    this.renderer.appendChild(this.div.nativeElement, img)

    this.presentAlert()
  }














  




  dismiss(){
    this.router.navigateByUrl('/outfits')
   // this.modalCtrl.dismiss()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      message :'Add this pictrue in wardrobe ?',
      mode:"ios",
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.presentAddToWardrobe()
          }
        },
      ],
    });

    await alert.present();
  }

  createInputs() {
   const theNewInputs = [];
    for (let i = 0; i < this.userGroups.length; i++) {
      
      theNewInputs.push(
        {
          type: 'radio',
          label: this.userGroups[i].groupName,
          value: this.userGroups[i].id,
        }
      );
    }
    theNewInputs.push(
      {
        type: 'radio',
        label: '+ Add new Wardrobe ',
        value: -1,
      });

    this.myInputs =  theNewInputs;
  }

  async presentAddToWardrobe(){
    this.createInputs()
    let alert = await this.alertController.create({
      message: 'Select Wardrobe',
      mode:"ios",
      inputs:  this.myInputs,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            if(data!=-1){
           const uploadImageData = new FormData();
            uploadImageData.append('base64', this.pictureCamera.imgUri);
            uploadImageData.append('type', this.pictureCamera.type);
           uploadImageData.append('groupeid', data);
           this.wardrobeService.uploadByCamera(uploadImageData).subscribe((response) => {}
           );
          }
          if(data =-1){
            this.addNewWardrobe();
       
          }
          
        }
      }
      ]
      
    });
    alert.present();
  }

  async addNewWardrobe(){
 
  const alert = await this.alertController.create({
    message: 'Please enter your Wardrobe Name',
    mode:'ios',
    inputs: [
      {
        name: 'name',
        placeholder: 'Wardrobe name...',
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
       
          this.wardrobeService.addGroupWardrobe(data.name)
       //   this.getUserGroups()

        }
      }
      ]
  });
   await alert.present();
}

}
