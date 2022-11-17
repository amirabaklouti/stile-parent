import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController, ToastController } from '@ionic/angular';
import { Image } from '../model/image';
import { ImageService } from '../_services/image.service';
import {DomSanitizer} from '@angular/platform-browser';
import { TryClothComponent } from '../try-cloth/try-cloth.component';
import { ClothesService } from '../_services/clothes.service';
import { Cloth } from '../model/cloth';
import { WardrobeService } from '../_services/wardrobe.service';



@Component({
  selector: 'app-search-image',
  templateUrl: './search-image.component.html',
  styleUrls: ['./search-image.component.scss'],
})
export class SearchImageComponent implements OnInit {

  @ViewChild('aiImage') aiImage: ElementRef;

  elements:Image[]=[];
  mode
  searchingOn = false
  displaySearch = false
  switcher
  result: Cloth[] = [];
  initialResult: Cloth[] = [];

staticshirts
staticPants
staticShoes

file

imageAi

userGroups
groupSelected
getWardrobes = false
  constructor(private renderer :Renderer2, private wardrobeService : WardrobeService , private clothesService :ClothesService, private modalCtrl :ModalController, public navCtrl: NavController,private sanitizer:DomSanitizer,private router:Router, private alertCtrl:AlertController, private loadingController:LoadingController, private toastController:ToastController, private imageService:ImageService)
   {
    this.mode = "Similar"
    }


    searchClothes() {
      this.staticshirts = []
      this.clothesService.getClothesByCategoryId(1).subscribe(clothes => {
        this.staticshirts = clothes;
 //       this.initialResult = this.result;
  
      })
      this.clothesService.getClothesByCategoryId(2).subscribe(clothes => {
        this.staticPants = clothes;
 //       this.initialResult = this.result;
  
      })
      this.clothesService.getClothesByCategoryId(4).subscribe(clothes => {
        this.staticShoes = clothes;
 //       this.initialResult = this.result;
  
      })
      this.clothesService.getClothesByCategoryId(1).subscribe(clothes => {
        this.staticshirts = clothes;
 //       this.initialResult = this.result;
  
      })
   /*   this.clothesService.searchClothes("zara").subscribe(clothes => {
        this.result = clothes;
        this.initialResult = this.result;
      })*/
      return this.result;
    }

   takePicture = async () => {
      const image = await Camera.getPhoto({
        quality: 60,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
      this.url = 'data:image/'+image.format+';base64,'+image.base64String;
    const file = this.b64toBlob(image.base64String, `image/${image.format}`);
     const formData  = new FormData();
     formData.append('file', file, 'file' );
     this.wardrobeService.sendFile(formData).then((HttpResponse  :any) => {
     this.url = HttpResponse.body.response
   })
    };

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
			this.url = this.sanitizer.bypassSecurityTrustUrl(this.reader.result); ; 
		}
	}
  sanitize(url){
    url = this.sanitizer.bypassSecurityTrustUrl(url); ;
    return url ;
  }
  getImages(){
    this.imageService.getImages().subscribe(elements => {this.elements=elements
    })
  }

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
    console.log('onDidDismiss resolved with role', role);
  }

  ngOnInit() {
    this.getUserGroups();
 //   this.presentAlert()
    this.getImages();
    
  }


  async tryModal() {
    this.searchingOn =true
  //  const presentModel = await this.modalCtrl.create({
  //    component: TryClothComponent,
 //     showBackdrop: true,
 //     mode: "ios",
 //     componentProps: { 'url': this.url }
//    });
  // this.wardrobeService.deleteClothFromAi(file).subscribe(data => {

  //  this.imageAi="../assets/cropped.jpg"
 

//  });
}
async clear(){
  this.url=""

}

searchItems(){
  this.searchClothes() 
 
  this.displaySearch = true
  this.switcher = this.mode;
}
retun(){
  this.searchingOn = false
  this.url=""
}
retunToChoose(){
  this.displaySearch = false
}


getFromWardrobe(){
  if (this.getWardrobes == false){this.getWardrobes = true}else{
    this.getWardrobes = false
  }
}

getUserGroups(){
  this.userGroups = []
  this.wardrobeService.checkGroupes().subscribe( data=>{
  this.userGroups = data  
  });
}
handleChange(ev) {
  this.groupSelected = ev.target.value;

}
changeUriToWardrobe(uri){
  this.url = uri
}

async sendFile(){
  const formData  = new FormData();
  let files = (<HTMLInputElement>document.getElementById('file')).files[0];
  const file = new Blob([files]);
  formData.append('file', file , 'file');
  this.wardrobeService.sendFile(formData).then((HttpResponse  :any) => {
  this.url = HttpResponse .body.response
})
}

}

