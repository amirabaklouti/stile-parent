import { Component, OnInit } from '@angular/core';
import { Cloth } from '../model/cloth';
import { ClothesService } from '../_services/clothes.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favorites:Cloth[]=[]
  fav:boolean
  constructor(private clothesService:ClothesService, private userService:UserService) {
 //   this.getFavorites();
   }
  getFavorites() {

    if(localStorage.getItem('favorites')){
      this.favorites = JSON.parse(localStorage.getItem('favorites'))
    }else{
    this.clothesService.findFavoritesByUser().subscribe((clothes:any) => {
      this.favorites=clothes;
      let arr = []
      clothes.forEach(element => {
        arr.push(element.id)
      });
     localStorage.setItem('favorites',JSON.stringify(clothes))
     localStorage.setItem('favoritesId',JSON.stringify(arr))
    })
  }
}
  favoriteStatusChange(cloth) {
    this.userService.checkFavoriteStatus(cloth.id).subscribe((favorited) => { 
      if (favorited == true) {
        this.userService.removeFromFavorites(cloth.id);
        favorited = false;
      }
      else {
          this.userService.addToFavorites(cloth.id);
          favorited = true;
        }
      this.fav=favorited;
    }
    )
    // debugger
    this.favorites=[]
    this.getFavorites();
  }

  ngOnInit() {
    this.getFavorites();
  }
  ionViewWillEnter(){
    this.ngOnInit()
  }

}
