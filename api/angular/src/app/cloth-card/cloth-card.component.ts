import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EventEmitter } from '@angular/core';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { ClothesService } from '../_services/clothes.service';

@Component({
  selector: 'app-cloth-card',
  templateUrl: './cloth-card.component.html',
  styleUrls: ['./cloth-card.component.scss'],
})
export class ClothCardComponent implements OnInit {
  @Input('item') item
  @Input('result') result
  @Output() reload = new EventEmitter()
  favorites: any[] = [];
  fav: boolean
  bestPrice: any;
  bestReview: any;

  favoritesId

  constructor(private clothesService : ClothesService , public router: Router, private modalCtrl: ModalController, private userService: UserService) {
  }


  favoriteStatus(id) {
   let favorites = (JSON.parse(localStorage.getItem('favoritesId')))
   this.fav = false
   for (let i = 0; i < favorites.length; i++) {
    const element = favorites[i];

    if (element==id) {
      this.fav = true
    }
   }

  /*  this.userService.checkFavoriteStatus(id).subscribe((favorited) => {*/
  /*    if (favorited == true) {
        this.fav = true
      }
      else {
        this.fav = false
      }*/
 /*   }) */

  }
  async favoriteStatusChange(cloth) {
   await this.userService.checkFavoriteStatus(cloth.id).subscribe((favorited) => { 

      if (favorited == true) {
        this.userService.removeFromFavorites(cloth.id);
        favorited = false;
      }
      else {
          this.userService.addToFavorites(cloth.id);
          favorited = true;
        }
      this.fav=favorited;
    })
this.favoritesMang()
  }

  favoritesMang(){
    localStorage.removeItem('favorites')
    this.clothesService.findFavoritesByUser().subscribe(clothes => {
      let arr = []
      clothes.forEach(element => {
        arr.push(element.id)
      });
     localStorage.setItem('favorites',JSON.stringify(clothes))
     localStorage.setItem('favoritesId',JSON.stringify(arr))
    })
  }

  async ProductModal(c: any) {
    let cloth
    this.clothesService.getClothById(c.id).subscribe( async data =>{
      cloth = data
      const presentModel = await this.modalCtrl.create({
        component: ProductInfoComponent,
        showBackdrop: true,
        mode: "ios",
        componentProps: { 'cloth': cloth, "fav": this.fav }
      });
  
      presentModel.onWillDismiss().then((data) => {
        this.reload.emit();
        //custom code
        if(this.router.url === '/collection'){
         this.router.navigateByUrl('/collection')
        }
      });
  
      return await presentModel.present();
      
    });

  }

  ngOnInit() {
    this.favoriteStatus(this.item.id)
  
 /*   if (this.result != undefined) {
      this.result.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
      this.bestPrice = this.result[0];
      this.result.sort((a, b) => (a.totalStars < b.totalStars) ? 1 : ((b.totalStars < a.totalStars) ? -1 : 0))
      this.bestReview = this.result[0]
    }   */
  }
 
  }

