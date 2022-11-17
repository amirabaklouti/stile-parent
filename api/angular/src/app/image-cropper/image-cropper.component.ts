import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {CropperSettings} from 'ngx-img-cropper';
@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss'],
})
export class ImageCropperComponent implements OnInit {
  data:any;
  cropperSettings: CropperSettings;
  
  //@Input()
  //src

  @ViewChild("image")
  img: any;

  @ViewChild('cropper', undefined)
  cropper:ImageCropperComponent;
  constructor() {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;

    this.data = {};
    this.cropperSettings.noFileInput = true;
    this.data = {};
   }

  ngOnInit() {
    this.cropperSettings.noFileInput = true;
  }

  fileChangeListener($event) {

    var img:any = new Image();
    var file:File = $event.target.files[0];
    var myReader:FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent:any) {
      img.src = loadEvent.target.result
    //  img.setImage(img);
    };
    
    myReader.readAsDataURL(file);

}
}
