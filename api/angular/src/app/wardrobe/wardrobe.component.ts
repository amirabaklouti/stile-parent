import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonModal, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Image } from '../model/image';
import { trigger, style, animate, transition } from '@angular/animations';
import { ImageService } from '../_services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import { WardrobeService } from '../_services/wardrobe.service';
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
import {Input, ChangeDetectionStrategy,ChangeDetectorRef } from 
   '@angular/core';
import { OutfitService } from '../_services/outfit.service';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-wardrobe',
  templateUrl: './wardrobe.component.html',
  styleUrls: ['./wardrobe.component.scss'],
/*  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ],*/
})
export class WardrobeComponent implements OnInit {

  @ViewChild(IonModal) del: IonModal;
  isModalOpen = false;
  elements:Image[]=[];
  addGroupModal =false
  form: FormGroup;
  groupName
  userGroups 
  check = false
  detectedGroup
  modify=false
  Images_To_Delete: any;

  NotJoinedWardrobes
 // clothsToDeleteFromGroup: any;
  
  async submitRequestFailed(){
    const toast = await this.toastController.create({
      message: 'Please select an image!',
      duration: 2000
    });
    toast.present();
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  
  }
  onSubmit(){
    let test=0
    if(this.reader){
     this.elements.forEach(e => {
      if(e.input==this.reader.result){
        test=1
        var det=e.detected;
        this.presentLoading();
        setTimeout(() => {this.router.navigate(['/detected-clothes'],{ queryParams: {detected:det}});
        this.url=null},4000);
      }
    })
    if(test==0){
      this.presentLoading();
      setTimeout(() => {this.failedAlert()},4500);
    }}
    else
      this.submitRequestFailed(); 
  }
  async failedAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      animated:true,
      header: 'Instruction',
      message: 'No clothes detected! Please choose a different picture!',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

  }
  url: any; //Angular 11, for stricter type
	reader;
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		this.reader = new FileReader();
		this.reader.readAsDataURL(event.target.files[0]);
		
		this.reader.onload = (_event) => {
			this.url = this.sanitizer.bypassSecurityTrustUrl(this.reader.result); ; 
		}
	}
 /* getImages(){
    this.imageService.getImages().subscribe(elements => {this.elements=elements
    })
  }*/

  list= false

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      animated:true,
      header: 'Instruction',
      message: 'Upload a clear picture taken in a decent light that shows the item that you wish to find similar items to.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
   
  }
  
  constructor(private outfitService :OutfitService, private cdr:ChangeDetectorRef,private alertController :AlertController, private modalCtrl: ModalController, private wardrobeService :WardrobeService, private sanitizer:DomSanitizer,private router:Router, private alertCtrl:AlertController, private loadingController:LoadingController, private toastController:ToastController, private imageService:ImageService) { }

  ngOnInit() {
 //   this.presentAlert()
  //  this.getImages();
  //  this.getUserGroups();
  //  this.getNotJoinedWardrobes()
  }

  ionViewWillEnter(){
    if(localStorage.getItem('wardrobes')){
      this.userGroups = JSON.parse(localStorage.getItem('wardrobes'))
    }else{
      this.getUserGroups();
    }
    if(localStorage.getItem('notJoinedWardrobes')){
      this.NotJoinedWardrobes = JSON.parse(localStorage.getItem('notJoinedWardrobes'))
    }else{
      this.getNotJoinedWardrobes();
    }  
  }
  getNotJoinedWardrobes(){
    this.outfitService.getNotJoinedWardrobesByUser().subscribe(data=>{
      this.NotJoinedWardrobes = data
      localStorage.setItem('notJoinedWardrobes',JSON.stringify(this.NotJoinedWardrobes))  
    })
  }


  showlist(){
    if(this.list==false){this.list=true}
  }
  addImage(){
  
  }

  async addGroup(groupName){

  this.wardrobeService.checkGroupes().subscribe( data=>{
    this.userGroups =data 
    for (let i = 0; i < this.userGroups.length; i++){
      if(this.userGroups[i]==groupName){
        this.check = true
      }
    }  
  })

  if(this.check === false){
  await this.wardrobeService.addGroupWardrobe(groupName);
  //  this.wardrobeService.checkGroupes().subscribe( data=>{
  //    this.userGroups = [...this.userGroups, data];
  //  })
      this.addGroupModal =false;
      this.groupName ='';
     this.modalAdded(groupName);
   
  }
  if(this.check === true){
    this.modal();
    this.check =false

  }
}

async modal(){
  const toast = await this.toastController.create({
    message: this.groupName + ' name is used' ,
    duration: 2000,
    mode :"ios",
  });
  toast.present();
}

async modalAdded(name){
  const toast = await this.toastController.create({
    message: name + ' is added successfully' ,
    duration: 500,
    mode :"ios",
  });
  await this.getUserGroups();
  toast.present();
}


async deleteGroupModal(name){
  const toast = await this.toastController.create({
    message: name + ' is deleted' ,
    duration: 500,
    mode :"ios",
  });
  await this.getUserGroups();
  toast.present();
  
}


showModal(){
  this.addGroupModal=true
}
closeAddChange(){
  this.addGroupModal=false
}

  async getUserGroups(){
 await this.wardrobeService.checkGroupes().subscribe((data :any)=>{
    this.userGroups = []
    for(let i = 0;i<data.length;i++) { 
    this.userGroups = [...this.userGroups, data[i]]; 
    localStorage.setItem('wardrobes',JSON.stringify(this.userGroups))  
   }
  });
}



deleteGroup(id,name){
  this.presentWillDelete(id,name)
}

async presentWillDelete(id,name){
  let alert = await this.alertController.create({
    message: 'are you sure to delete ' + name + ' ?',
    mode:"ios",
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: async () => {
         await this.wardrobeService.deleteGroupe(id);
          this.deleteGroupModal(name);
        }
        
    }
    ]  
  });
  alert.present();
}

modifyChange(group){
  this.detectedGroup=group
  this.modify=true
}
closeModifyChange(){
  this.modify=false
}

modifyGroupName(oldName,newName){

  this.wardrobeService.modifyGroupName(oldName,newName).toPromise().then(async () => {
    await this.getUserGroups();
    });
this.modalGroupNamechanged(oldName,newName)
  this.modify=false
}
async modalGroupNamechanged(oldName,newName){
  const toast = await this.toastController.create({
    message: oldName+' is changed to ' + newName  ,
    duration: 2000,
    mode :"ios",
  });
  toast.present();

}



  async addPicture(groupeid) {

    const presentModel = await this.modalCtrl.create({
      component: UploadImgComponent,
      componentProps: { 
        groupeid: groupeid,
        
      },
      showBackdrop: true,
      mode: "ios",
      cssClass: 'notifications'
    });

    presentModel.onWillDismiss().then(async () => {
    await this.getUserGroups();
    });
    presentModel.present();
  }

  async OpenModel(cloth) {
    const presentModel = await this.modalCtrl.create({
      component: UploadImgComponent,
      componentProps: { 
        editWardrobe: cloth ,
        src: cloth.imgUri,
      },
      showBackdrop: true,
      mode: "ios",
    });

   
    

    presentModel.onWillDismiss().then(async () => {
    await this.getUserGroups();
    await this.getNotJoinedWardrobes();
     // var el = document.getElementById("used-"+cloth.id)
     // if(el!==null){el.remove();}
    
    });

    return await presentModel.present();
  }
  async viewModal(cloth) {
    const presentModel = await this.modalCtrl.create({
      component: ImageViewerComponent,
      componentProps: { 
        wardrobe: cloth ,
        src: cloth.imgUri,
      },
      showBackdrop: true,
      mode: "ios",
    });


    return await presentModel.present();
  }

  setOpen(isOpen: boolean,id) {
    if (isOpen=true) {
      this.isModalOpen = isOpen;

    }
     this.Images_To_Delete = this.userGroups.find(t=>t.id == id);
     this.modalCtrl.dismiss()
  }


  deleteCloth(item){
    this.outfitService.getWardrobesUsedInOutfitsByUser(item.id).subscribe((data :any) =>{
      if(data==false)
      {
        this.ItemWillDelete(item)
      }else{
        this.ItemWillDeleteInOutfit(item)
      }
      
     
    })

  }

  async ItemWillDelete(item){
 
    let alert = await this.alertController.create({
      message: 'are you sure to delete ' + item.name + ' ?',
      mode:"ios",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: () => {
            this.wardrobeService.deleteClothFromGroupUsedOutfits(item.id).then(async () => {
              this.getUserGroups();
              this.getNotJoinedWardrobes();
              var el = document.getElementById(item.id);
              el.remove();
              });
            
      

         /*   for (let i = 0;this.userGroups.length <= i; i++) {
              if(this.userGroups[i] !== undefined){
                this.userGroups[i].wardrobes = this.userGroups[i].wardrobes.filter(el => el !== item);
              }
               
            }
          //  
              var element = document.getElementById(item.id);
              var felement = document.getElementById('f'+item.id);
              element.remove();
              felement.remove();*/

          }
          
      }
      ]  
    });
    alert.present();
  }



  async ItemWillDeleteInOutfit(item){
  let alert = await this.alertController.create({
    message: 'are you sure to delete ' + item.name + ' ? It is used in your Outfits',
    mode:"ios",
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      },
      {
        text: 'OK',
        handler: () => {
          this.wardrobeService.deleteClothFromGroupUsedOutfits(item.id);
          for (let i = 0;this.userGroups.length <= i; i++) {
            if(this.userGroups[i] !== undefined){
              this.userGroups[i].wardrobes = this.userGroups[i].wardrobes.filter(el => el !== item);
            }
             
          }
        //  this.getUserGroups();
            var element = document.getElementById(item.id);
            var felement = document.getElementById('f'+item.id);
            element.remove();
            felement.remove();

        }
        
    }
    ]  
  });
  alert.present();
}





  dismiss(){
    this.isModalOpen =false
    this.modalCtrl.dismiss();
  }
   


  sanitize(url){
    url = this.sanitizer.bypassSecurityTrustUrl(url); ;
    return url ;
  }



}
