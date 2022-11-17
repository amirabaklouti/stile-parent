import { Component, OnInit, Renderer2 } from '@angular/core';
import {Location} from '@angular/common';
import { ImageService } from '../_services/image.service';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Image } from '../model/image';
import { ImageCropperComponent } from '../image-cropper/image-cropper.component';
import { UserService } from '../_services/user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { DomSanitizer } from '@angular/platform-browser';
import moment from 'moment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {



  elements:Image[]=[];
 
  modify = false;

  username
  phone
  email
  birthDate
  gender
  imgUri 
  format
  ProfileImgBase64


  constructor(private location: Location,
    private ModalController :ModalController,
    private router:Router,
     private alertCtrl:AlertController,
      private loadingController:LoadingController,
       private toastController:ToastController, 
       private imageService:ImageService,
       private  userService :UserService,
       private sanitizer:DomSanitizer,
       private renderer : Renderer2 ,
      ) {defineCustomElements(window);}

ngOnInit(){
  if(localStorage.getItem('phone') && localStorage.getItem('birthDate') && localStorage.getItem('gender') ){
    this.imgUri = JSON.parse(localStorage.getItem('profileImg'))
    this.username = JSON.parse(localStorage.getItem('profileName'))
    this.phone =  JSON.parse(localStorage.getItem('phone'))
    this.email =  JSON.parse(localStorage.getItem('email'))
    this.birthDate =  JSON.parse(localStorage.getItem('birthDate'))
    this.gender =  JSON.parse(localStorage.getItem('gender'))

  }else{
  this.getUser();
  }
}

getUser(){
  this.userService.getUser().subscribe((data:any) => {
    this.username = data.username
    this.phone = data.phone
    this.email = data.email
    this.birthDate =  moment(data.birthDate).format("YYYY-MM-DD") 
    this.gender = data.sexe
    this.imgUri =data.profileImg
    localStorage.setItem('phone',JSON.stringify(this.phone))
    localStorage.setItem('email',JSON.stringify(this.email))
    localStorage.setItem('birthDate',JSON.stringify(this.birthDate))
    localStorage.setItem('gender',JSON.stringify(this.gender))
  })
}
sanitize(img){
  return  this.sanitizer.bypassSecurityTrustResourceUrl(img) 
}

backClicked() {
  this.location.back();
}
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
  console.log('Loading dismissed!');
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
  console.log('onDidDismiss resolved with role', role);
}
url: any; //Angular 11, for stricter type
reader;
//selectFile(event) { //Angular 8
selectFile(event: any) { //Angular 11, for stricter type
  this.reader = new FileReader();
  this.reader.readAsDataURL(event.target.files[0]);
  
  this.reader.onload = (_event) => {
    this.url = this.reader.result; 
  }
}
getImages(){
  this.imageService.getImages().subscribe(elements => {this.elements=elements
  })
}

async presentModal(img) {
  //   debugger
     const modal = await this.ModalController.create({
   component: ImageCropperComponent,
     componentProps: { 
       src: img, 
     }
   });
   return await modal.present();
 }

 modifyMode(){
  if (this.modify == false){this.modify = true}
  else{
    this.modify = false } 
   }

   modidyUserDetails(){
    const informations = new FormData();
    informations.append('phone', this.phone);
    informations.append('email', this.email);
    informations.append('birthDate',moment(this.birthDate).format("DD/MM/YYYY"));
    informations.append('gender', this.gender);
    if(this.ProfileImgBase64 == undefined){
      informations.append('imgUri', this.imgUri);
    }else{
      informations.append('imgUri', this.ProfileImgBase64);
    }
    this.userService.setUser(informations).subscribe();
    this.modify = false;
    this.profileUpdated();
   // history.go(0)
   }

async profileUpdated(){
  let alert = await this.toastController.create({
    message: 'Profile Updated successfully',
    mode:"ios",
    duration: 2000,
  });  
localStorage.removeItem('profileImg')
localStorage.removeItem('profileImgSide')
localStorage.removeItem('profileNameSide')
localStorage.removeItem('phone')
localStorage.removeItem('email')
localStorage.removeItem('birthDate')
localStorage.removeItem('gender')
localStorage.setItem('profileImg',JSON.stringify(this.imgUri))
localStorage.setItem('profileImgSide',JSON.stringify(this.imgUri))
localStorage.setItem('profileNameSide',JSON.stringify(this.username))
localStorage.setItem('phone',JSON.stringify(this.phone))
localStorage.setItem('email',JSON.stringify(this.email))
localStorage.setItem('birthDate',JSON.stringify(this.birthDate))
localStorage.setItem('gender',JSON.stringify(this.gender))
alert.present();
}



 takePicture = async () => {
  this.modify = true
  if(this.modify){
  const image = await Camera.getPhoto({
    quality: 100,
    allowEditing: false,
    width: 100,
    height: 100,
    resultType: CameraResultType.Base64,
  });
  this.format =image.format
 // const blob = this.b64toBlob(image.base64String,`image/${image.format}`);
 //this.ProfileImgBase64 = this.resizeBase64Img(("data:image/"+image.format+";base64,"+image.base64String),100)
 //console.log(("data:image/"+image.format+";base64,"+image.base64String))
 this.imgUri = this.resizeImage("data:image/"+image.format+";base64,"+image.base64String)
    debugger
console.log(this.imgUri);
 }
 // this.ProfileImgBase64 = "data:image/"+image.format+";base64,"+image.base64String;
// console.log(this.ProfileImgBase64);
 /*var reader = new FileReader();
reader.readAsDataURL(blob); 
reader.onloadend = function() {
 base64data = reader.result;                
 console.log(base64data);
}*/
 
}



  resizeImage(base64) {
 const image: HTMLImageElement = this.renderer.createElement('img');
 image.src = base64
 if (image.naturalWidth < 1000) return base64
  var img = document.getElementById("open-modal") as HTMLImageElement
  img.src = base64
  let ratio = image.naturalWidth / image.naturalHeight
  // create an off-screen canvas
  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');

  // set its dimension to target size
  canvas.width = 250;
  canvas.height = 250 / ratio;

  // draw source image into the off-screen canvas:
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  // encode image to data-uri with base64 version of compressed image
  return canvas.toDataURL();
}
 /*
resizeImage(Base64) {
  const image: HTMLImageElement = this.renderer.createElement('img');
    image.src = Base64
    let w
    image.onload = function () {
    w =  image.width
  }
  if (w < 1000)  return Base64 
      let ratio = image.width / image.height
      var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');
      canvas.width = 250 ;
      canvas.height = 250 / ratio;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL();
}*/
/*async resizeBase64Img(base64, MAX_WIDTH) {
  let img = new Image()
  img.src = base64
  img.onload = () => {
      let canvas = document.createElement('canvas') as HTMLCanvasElement
      let width = img.width
      let height = img.height

      if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width
              width = MAX_WIDTH
          }
      } else {
          if (height > MAX_WIDTH) {
              width *= MAX_WIDTH / height
              height = MAX_WIDTH
          }
      }

      canvas.width = width
      canvas.height = height
      let ctx = canvas.getContext('2d')
      ctx.drawImage(img.src, 0, 0, width, height)
      const src = canvas.toDataURL()
      console.log(src)
      return src // this will return base64 image results after resize
  
}
}*/

/* compressImage(src, newX) {
  return new Promise((res) => {
      const img = new Image();
      img.src = src;
      img.width = newX
      img.height = newX
      res(img); 
})
} */





/*
 blobToBase64(blob){
  const reader = new FileReader();
  return reader.readAsDataURL(blob);
}

b64toBlob(b64Data, contentType = '', sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
    }
    */

}
