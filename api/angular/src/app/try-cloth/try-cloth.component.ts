import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ClothesService } from '../_services/clothes.service';

@Component({
  selector: 'app-try-cloth',
  templateUrl: './try-cloth.component.html',
  styleUrls: ['./try-cloth.component.scss'],
})
export class TryClothComponent implements OnInit {
 // cloth = this.navParams.get('cloth');
  clothesList;
  slideOpts;
  dismiss() {
    this.tryModalCtrl.dismiss();
  }
  constructor(private tryModalCtrl: ModalController, private clothesService: ClothesService
      /* , public navParams: NavParams*/) {
 //   this.getClothIndex(this.cloth.id)
  }
  getClothIndex(id){
    this.clothesService.getClothIndex(id).then(tab =>{
      this.slideOpts = {
        slidesPerView: 2.25,
        initialSlide:tab[0],
        centeredSlides: true
      }
      this.clothesList=tab[1]})
  }
  ngOnInit() {
  }

}
