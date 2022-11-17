import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WardrobeService } from '../_services/wardrobe.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Features {
  name: string;
}

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss'],
})
export class UploadImgComponent implements OnInit {


  @Input('editWardrobe')editWardrobe:any
  willEdit = false
  userGroups
  wardrobeGroupId
  label
  groupeid
  format
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;

 
  newFeature


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

name = "Lacoste Black T-shirt"
category = "shirt"
size = "M"
color = "#000000"
tissue = "Coton"
brand ="Lacoste"
features = []


  constructor(private renderer: Renderer2,private modalCtrl :ModalController, private wardrobeService : WardrobeService ,private httpClient: HttpClient) {}



  add(newFeature,event: MatChipInputEvent): void {
    if(newFeature!==undefined){
    const input = event.input;
    const value = newFeature;
    if ((value || '').trim()) {
      this.features.push({name: value.trim()});
    }
    if (newFeature) {
      this.newFeature = '';
    }
  }
  }

  remove(feature: Features): void {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }





  ngOnInit() {
    if(this.editWardrobe!==undefined){
      this.getUserGroups();
      this.cardImageBase64 = this.editWardrobe.imgUri
      this.isImageSaved = true
      this.willEdit = true
      
    }
  }

 
  getUserGroups(){
    this.userGroups = []
    this.wardrobeService.checkGroupes().subscribe( data=>{
    this.userGroups = data 
    });
  
  
  }

  fileToUpload: any;
  imageUrl: any;
  code
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;         
          this.isImageSaved = true;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
/*
  sendImg(){
    this.code = this.imageUrl.replace("data:image/png;base64,/", "");
    this.wardrobeService.addImageWardrobeGroup(this.groupeid,this.code,this.label)
  }
*/

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  async onUpload() { 
 const uploadImageData = new FormData();
 let f = []
 //this.newFeature = this.features
 for (let i = 0; i < this.features.length; i++) {
   f.push(this.features[i].name)
}
 
 /*if(this.selectedFile!=undefined){
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  uploadImageData.append('groupeid', this.groupeid);
  uploadImageData.append('itemName', this.groupeid);

  this.wardrobeService.sendImage(uploadImageData).subscribe((response) => {}
);
 }else{*/
  if(this.editWardrobe==undefined){
  uploadImageData.append('base64', this.cardImageBase64);
  uploadImageData.append('type', this.format);
  uploadImageData.append('groupeid', this.groupeid);
  uploadImageData.append('name', this.name);
  uploadImageData.append('category', this.category);
  uploadImageData.append('size', this.size);
  uploadImageData.append('color', this.color);
  uploadImageData.append('brand', this.brand);
  uploadImageData.append('tissue', this.tissue);
  if(this.features.length !==null){
  uploadImageData.append('features', JSON.stringify(f));
  }
  await this.wardrobeService.uploadWardrobe(uploadImageData).toPromise().then(data => {
  this.modalCtrl.dismiss()     })
}
else{
  uploadImageData.append('wardrobeId', this.editWardrobe.id);
  uploadImageData.append('groupeid',this.wardrobeGroupId);
  
  uploadImageData.append('name', this.name);
  uploadImageData.append('category', this.category);
  uploadImageData.append('size', this.size);
  uploadImageData.append('color', this.color);
  uploadImageData.append('brand', this.brand);
  uploadImageData.append('tissue', this.tissue);
  if(this.features.length !==null){
  uploadImageData.append('features', JSON.stringify(f));
  } 
 await this.wardrobeService.editWardrobe(uploadImageData).toPromise().then(data => {
this.modalCtrl.dismiss()})

}
  //}

  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    this.format =image.format
    this.cardImageBase64 = this.resizeImage('data:image/'+image.format+';base64,'+image.base64String) ;
    this.isImageSaved = true;
  };

  resizeImage(base64) {
    const image: HTMLImageElement = this.renderer.createElement('img');
    image.src = base64
    if (image.naturalWidth < 1000) return base64
    
     var img = document.getElementById("cardImageBase64") as HTMLImageElement
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

  removeChip(chip: Element) {
    var element = document.getElementById("Elasticity");
    element.remove();
  }

}
