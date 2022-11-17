import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FootwearComponent } from '../footwear/footwear.component';
import { OutfitService } from '../_services/outfit.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
  outfits
  constructor(private location :Location, private outfitService :OutfitService,private modalCtrl :ModalController) { }

  ngOnInit() {

    this.outfitService.getAllUsersOutfits().subscribe(data =>
      this.outfits = data
      
)}
async showOutfitItems(outfit){
  const presentModel = await this.modalCtrl.create({
    component: FootwearComponent,
    componentProps: { 
      outfit: outfit ,
    },
    showBackdrop: true,
    mode: "ios",
  });

  return await presentModel.present();
}

  backClicked() {
    this.location.back();
  }
}
