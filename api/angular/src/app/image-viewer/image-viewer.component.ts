import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonSlides , ModalController} from '@ionic/angular';
import { UploadImgComponent } from '../upload-img/upload-img.component';
import { WardrobeService } from '../_services/wardrobe.service';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent implements OnInit {
@Input('src')src:any
@Input('wardrobe')wardrobe:any
@Input('cloth')cloth:any

@ViewChild(IonSlides) slides :IonSlides;
sliderOpts ={
  zoom: { maxRatio: 5 }
}
features = []

  constructor(private wardrobeService : WardrobeService, private ModalController :ModalController) { 

}
  ngOnInit(): void {
if(this.wardrobe!==undefined){
   for (let i = 0; i < this.wardrobe.features.length; i++){
      this.features.push(this.wardrobe.features[i].name)
  }
}
 
  }


  ionViewDidEnter(){
   // this.slides.update();
  }
 
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
 
  close() {
    this.ModalController.dismiss();
  }



  async addToWardrobe(wardrobe) {
    const presentModel = await this.ModalController.create({
      component: UploadImgComponent,
      componentProps: { 
        editWardrobe: wardrobe,
      },
      showBackdrop: true,
      mode: "ios",
    });

    presentModel.onWillDismiss().then((data) => {  
    });

    return await presentModel.present();
  }
}
