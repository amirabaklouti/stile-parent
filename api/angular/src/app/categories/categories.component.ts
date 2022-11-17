import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';
import { Category } from '../model/category';
import { CategoryService } from '../_services/category.service';
import { ClothesService } from '../_services/clothes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  searchedItem:Category[]=[];
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe((categoryList) => {
      this.searchedItem=categoryList;
      this.searchedItem.forEach(category => {
        if(category.count==null){
          category.count=0;
        }
        if (category.imgUri)
          category.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(category.imgUri)
      })
      })
    return this.searchedItem;
  }
  navigateCategory(categoryTerm:string){
      this.router.navigate(['/action','category', categoryTerm]);
  }
  searchCategory(event){
    
    const val= event.target.value;
    console.log(val)
    if(val&& val.trim()!='')
      this.categoryService.searchCategory(val.toLowerCase()).then(categoryList => 
      { console.log(categoryList)
        this.searchedItem=categoryList})
    else{
      this.resetChanges();
    }
  }
  getCountClothByCategory(){
    this.clothService.getCountClothByCategory().then((result) => {
      console.log(result);
    })
  }
  async OpenModel() {
    const presentModel = await this.modalCtrl.create({
      component: FilterComponent,
      showBackdrop: true,
      mode: "ios",
      cssClass: 'filter'
    });

    presentModel.onWillDismiss().then((data) => {
      console.log(data);
      //custom code
    });

    return await presentModel.present();
  }
  resetChanges(){
    this.searchedItem=this.getAllCategories();
  }

  constructor(private _location: Location,private router:Router, private sanitizer: DomSanitizer, private modalCtrl:ModalController, private categoryService:CategoryService, private clothService: ClothesService) { }

  ngOnInit() {
    this.searchedItem=this.getAllCategories();
  }

  backClicked() {
    this._location.back();
  }
}
