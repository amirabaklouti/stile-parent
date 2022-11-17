import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonInfiniteScroll, IonSearchbar, ModalController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';
import { HeaderComponent } from '../header/header.component';
import { StartComponent } from '../start/start.component';
import { ClothesService } from '../_services/clothes.service';
import { SearchService } from '../_services/search.service';
import { UserService } from '../_services/user.service';
import typoCorrection, { typoCorrections } from "typo-correction";
import textgears from 'textgears-api';
//const textgearsApi = textgears('Qk48RNQ8WuTb71nP', {language: 'en-US', ai: true});
// var typoCorrections = require("typo-correction")

 var Typo = require("typo-js");
 var dictionary = new Typo("en_US", false, false, { dictionaryPath: "../../assets/" })
// import didYouMean from "didyoumean";

// var SpellCorrector = require('spelling-corrector');
// var spellCorrector = new SpellCorrector();


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  
  dict = []

  content: string;
  searchTerm:string;
  lengthItems = false
  clothSearched
  result
  zara : String
  page = 0
  type: string;
  filterTerm: any;
  firstLogin

  totalPages = 0
  best
  infiniteScrollEnabled=true

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('mySearchbar', {static: false}) searchbar: IonSearchbar;
  Corrected = []
  constructor( private userService : UserService,  private modalCtrl: ModalController, private searchService:SearchService ,private router:Router,private clothesService : ClothesService) {
 //   debugger
   }
   

  //@ViewChild("header", {static: true}) header: HeaderComponent 
searching(text){
  this.page=0
  this.clothSearched =[]
  const words = text.split(" ");
  let lastwords = ""
  const lastWorldNbr = words.length
  
  //this.searchService.searchingClothes(text,this.page).subscribe((data :any)=> {
  // this.searchService.getSuggestion(words[lastWorldNbr-1]).subscribe((data :any)=> {
  this.searchService.getSuggestion(text.toLowerCase()).subscribe((data :any)=> {

  
    for (let i = 0; i < data.length; i++) {
      this.clothSearched = [...this.clothSearched ,data[i]]
     let dictwords = data[i].split(" ")
      
     dictwords.forEach(element => {
      this.dict.push(element.toLowerCase()) 
     });
    }
        var result = typoCorrections(text.toLowerCase(),this.dict);
      this.best = result.best
      if(this.best.toLowerCase() === text.toLowerCase()){
        this.best = undefined
      }
      console.log(this.dict)
      console.log(this.best)
  /*  for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if(words[i].includes(data[j])){
        words[i] = data[j]
       let newRow = words.join(" ")
       this.clothSearched = [...this.clothSearched ,newRow] 
        }
      }
   }
   /* const arr = data;

    const checker = text =>
    !data.some(element => text.includes(element));

    console.log(arr.filter(checker));
   // this.totalPages = data.totalPages
 //  lastwords = ""
  // for (let j = 0; j < words.length; j++) {
  //  lastwords = lastwords.concat(words[j-1])
  //  lastwords = (lastwords + " ").toString()
 //  }
//   if(lastwords == undefined){
    this.clothSearched =  JSON.parse(data)
    debugger*/
 //  }else{
 //   for (let i = 0; i < data.length; i++) {
 //     this.clothSearched = [...this.clothSearched ,lastwords + data[i]] 
      
 //  }
   

   if(this.clothSearched.length >= 2){
    this.lengthItems= true
   }
   else{
    this.lengthItems= false
   }
  })
}

 /*doInfinite() {
  setTimeout(async() => {
    this.page += 1;

       this.searchService.searchingClothes(this.searchTerm,this.page).subscribe((data :any)=> {
        for (let i = 0; i < data.content.length; i++) {
        this.clothSearched = [...this.clothSearched, data.content[i]]; 
        }
      });
  }, 500);
}*/


onScrollDown(): void {
  this.page += 1;
  setTimeout(() => {
    this.searchService.searchingClothes(this.searchTerm,this.page).subscribe((data :any)=> {
      for (let i = 0; i < data.content.length; i++) {
      this.clothSearched = [...this.clothSearched, data.content[i]]; 
      }
    });
  }, 1500)
}


async OpenModel() {
  const presentModel = await this.modalCtrl.create({
    component: FilterComponent,
    showBackdrop: true,
    mode: "ios",
    cssClass: 'filter',
    componentProps: { 'initialType': this.type, 'filterTerm': this.filterTerm }
  });

  return await presentModel.present();
}
slideOpt = {
  loop: true,
  autoplay:true
};



  onFocus($event){
    if (this.searchbar.value !==undefined){
    //  debugger
      if(this.searchbar.value.length >=2){
        this.searching(this.searchbar.value)
      }
    }
    if (this.searchbar.value==""){
      this.clothSearched =[]
     
    }
  }
  goTo(text){
    this.router.navigate(['/action','search', text]);
    this.clothSearched =[]
  }
  ngOnInit() {
//this.getClothes();
  }


 
/*  async showModalFirstLogin() {
    const presentModel = await this.modalCtrl.create({
      component: StartComponent,
      componentProps: { 
      },
      mode: "ios",
    });

    presentModel.onWillDismiss().then((data) => {  
    });

    return await presentModel.present();
  }
*/
/*
getClothes(){
  this.zara ="zara"
  this.clothesService.searchClothes(this.zara.toString(),0).subscribe(data => {
    this.result = data;
  })
}
*/

navigateSearch(){
     const best: NavigationExtras = {state: {best: this.best}}
     this.router.navigate(['/action','search', this.searchTerm],best);
}



  

  
}