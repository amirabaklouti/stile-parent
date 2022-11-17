import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar, ModalController } from '@ionic/angular';
import { FilterComponent } from '../filter/filter.component';
import { ActivatedRoute, Router } from '@angular/router'
import { ClothesService } from '../_services/clothes.service';
import { Cloth } from '../model/cloth';
import { DomSanitizer } from '@angular/platform-browser';
import { BrandService } from '../_services/brand.service';
import { ColorService } from '../_services/color.service';
import { SearchService } from '../_services/search.service';
import textgears from 'textgears-api';
const textgearsApi = textgears('Qk48RNQ8WuTb71nP', {language: 'en-US', ai: false});
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  result: Cloth[] = [];
  type: string;
  filterTerm: any;
  initialType: string;
  selectedBrands: any[] = []
  filteredItemsByPrice = []
  filteredItemsByBrands = []
  filteredItemsByColor = []
  initialResult
  hightolow: boolean = false;
  lowtohigh: boolean = false;

  content: string;
  searchTerm:string;
  lengthItems = false
  clothSearched
  
  zara : String
  page = 0
  firstLogin

  totalPages = 0

  infiniteScrollEnabled=true

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  @ViewChild('mySearchbar', {static: false}) searchbar: IonSearchbar;

  key: any;
  didYouMean: any;
  suggestedWords: string[];
  best: any;

  constructor(private ActivatedRoute :ActivatedRoute , private searchService : SearchService , private route: Router,private router: ActivatedRoute, private modalCtrl: ModalController, private brandService: BrandService, private colorService: ColorService, private sanitizer: DomSanitizer, private clothesService: ClothesService) {
  }


  searchClothes() {
    //correct tems
    
    this.result = []

    this.searchService.getMatch(this.filterTerm).subscribe((clothes :any)=> {
      for (let i = 0; i < clothes.length; i++) {
        this.result = [...this.result,clothes[i]]
      }
    })
    /*
    this.clothesService.searchClothes(this.filterTerm.toLowerCase(),this.page).subscribe((clothes :any)=> {
      for (let i = 0; i < clothes.content.length; i++) {
        this.result = [...this.result,clothes.content[i]]
        }
    })*/
   // this.initialResult = []
  //  this.initialResult = [...this.initialResult,this.result]

    // if tems is false get suggested words / sentens
 /*   if(this.result.length == 0){
      this.suggestedWords.forEach(element => {
          this.clothesService.searchClothes(element,this.page).subscribe((clothes :any)=> {
            for (let i = 0; i < clothes.content.length; i++) {
            this.result = [...this.result,clothes.content[i]]
            if(this.result.length !==0){
              this.didYouMean = element
            }
          }})
          })

          if(this.result.length == 0){
          let items = []
          let term = this.filterTerm.split(" ")
          debugger*/
       /*   term.forEach(element => {
            debugger*/
      /*      textgearsApi.checkSpelling(this.filterTerm).then((data) => {
              
              if(data.response.errors.length !==0){
                debugger
                 items.push(data.response.errors[0].better)
                 console.log(data.response.errors[0].better)
                }

          })
    
    /*    })*/
   /*     this.clothesService.searchClothesBywords(items).subscribe((clothes :any)=> {
          for (let i = 0; i < clothes.content.length; i++) {
          this.result = [...this.result,clothes.content[i]]
        }})
      }

    }*/
   /* if(this.result.length == 0){
      let items = []
                this.suggestedWords.forEach(element => {
                    textgearsApi.checkSpelling(element).then((data) => {
                      console.log(element)
                    if(data.response.errors.length !==0){
                       items.push(data.response.errors[0].better)
                       debugger
                      }


                       this.clothesService.searchClothes(items,this.page).subscribe((clothes :any)=> {
                        for (let i = 0; i < clothes.content.length; i++) {
                        this.result = [...this.result,clothes.content[i]]
                      }})
                      console.log(items)

})

}


             /*       this.clothesService.searchClothes(e.toLowerCase(),this.page).subscribe((clothes :any)=> {
                      for (let i = 0; i < clothes.content.length; i++) {
                      this.result = [...this.result,clothes.content[i]]
                    }})    */
          //      )

          //   } /*
               
               
                
              
    //          return this.result
 
  
  }


  searching(text){
    this.page=0
    this.clothSearched =[]
    this.searchService.searchingClothes(text,this.page).subscribe((data :any)=> {
      debugger
      this.totalPages = data.totalPages
      this.clothSearched = data.content
  //    debugger
     if(this.clothSearched.length >= 2){
      this.lengthItems= true
     }else{
      this.lengthItems= false
     }
    })
  }

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

///////////////////////////////////////////////////////////////////////////////////////////////
  navigateSearch(){
   this.route.navigate(['/action','search', this.searchTerm]);
    this.result = []
    this.page = 0
    this.clothesService.searchClothes(this.filterTerm.toLowerCase(),this.page).subscribe((clothes :any)=> {
      for (let i = 0; i < clothes.content.length; i++) {
      this.result = [...this.result,clothes.content[i]]
      }
      this.initialResult = this.result;

    })
  }

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
 
    this.result = []
    this.page = 0
    this.clothesService.searchClothes(text.toLowerCase(),this.page).subscribe((clothes :any)=> {
      for (let i = 0; i < clothes.content.length; i++) {
      this.result = [...this.result,clothes.content[i]]
      }
      this.initialResult = this.result;
    })

    this.clothSearched =[]
  }

  getClothesByCategory() {
    this.clothesService.getClothesByCategory(this.filterTerm).then((clothes) => {
      this.result = clothes;
      this.initialResult=this.result
      this.result.forEach(cloth => {
        if (cloth.imgUri)
          cloth.imgUri = this.sanitizer.bypassSecurityTrustResourceUrl(cloth.imgUri)
      })
    })
    return this.result;

  }
  applyFilter(brands, colors, min, max, discount) {
    if ((this.initialType == "search")||(this.initialType=="filter")) {
      this.result = []
      this.clothesService.combinedFilter(brands, colors, min, max, discount).subscribe((clothes) =>
        this.result = clothes)
    }
    if (this.initialType == "category") {
      this.result = []
      this.clothesService.combinedFilter(brands, colors, min, max, discount).subscribe((clothes) =>
        clothes.forEach(e => {
          if (e.category.id == this.filterTerm) {
            this.result.push(e)
          }
        })
      )
    }
    return this.result;
  }
  getClothes(){
    this.clothesService.getClothes().subscribe( items=> this.result=items)
  }
  secondarySearchClothes(event) {
    const val = event.target.value;
    if (this.type == "search") {
      if (val && val.trim() != '')
        this.clothesService.searchClothes(val.toLowerCase(),this.page).subscribe(clothesList => {
          this.result = clothesList
        })
      else {
        this.searchClothes()
        this.resetChanges()
      }
    }
    if (this.type == "category") {
      if (val && val.trim() != '')
        this.clothesService.searchClothes(val.toLowerCase(),this.page).subscribe(clothesList => {
          this.result = []
          clothesList.forEach(e => {
            if (e.category.id == this.filterTerm) {
              this.result.push(e);
            }
          })
        })
      else {
        this.getClothesByCategory()
        this.resetChanges()
      }
    }
    if (this.type == "filter") {
      this.result=[]
      if (this.initialType == "category") {
        this.result = []
        if (val && val.trim() != '')
          this.clothesService.searchClothes(val.toLowerCase(),this.page).subscribe(clothesList => {
            clothesList.forEach(e => {
              if (e.category.id == this.filterTerm) {
                this.result.push(e);
              }
            })
          })
        else {
          this.getClothesByCategory()
          this.resetChanges()
        }
      }
      if (this.initialType == "search") {
        this.result=[]
        if (val && val.trim() != '')
          this.clothesService.searchClothes(val.toLowerCase(),this.page).subscribe(clothesList => {
            this.result = clothesList
          })
        else {
          this.searchClothes()
          this.resetChanges();
        }
      }
      if(this.initialType=='filter'){
        this.result=[]
        if (val && val.trim() != '')
            this.clothesService.searchClothes(val.toLowerCase(),this.page).subscribe(clothesList => {
              this.result = clothesList
            })
          else {
            this.getClothes();
            this.initialResult =this.result
            this.resetChanges();
          }
      }
    }
  }
  lowestToHighest() {
    this.lowtohigh = true;
    this.hightolow = false;
    this.result.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
  }
  highestToLowest() {
    this.lowtohigh = false;
    this.hightolow = true;
    this.result.sort((a, b) => (a.price < b.price) ? 1 : ((b.price < a.price) ? -1 : 0))
  }
  resetChanges() {
    this.result = this.initialResult;
    this.lowtohigh = false;
    this.hightolow = false;
  }
  imageSearch(type, color) {
    this.clothesService.imageSearch(type, color).subscribe(clothes => this.result = clothes)
  }
  ngOnInit() {
 //   debugger
    if(history.state.best !==undefined ){ 
  //    debugger
      this.didYouMean = history.state.best
    }
    if(history.state.key !==undefined ){ 
      this.searchTerm = history.state.key
    }
    this.ActivatedRoute.queryParamMap.subscribe(params => this.suggestedWords = params.getAll('term'));
 console.log(this.suggestedWords)
    this.router.paramMap.subscribe(params => {
      this.type = params.get('type')
      this.filterTerm = params.get('term');
    });

    if (this.type == "search") {
       this.searchClothes();
    }
    if (this.type == "category") {
    this.getClothesByCategory();
    }
    if (this.type == "image") {
      this.router.queryParams.subscribe(items => {
        let type = items.type
        let color = items.color
        this.imageSearch(type, color);
      })
    }
    if (this.type == "filter") {

      this.router.queryParams.subscribe(items => {
        let brands = items.brands;
        let colors = items.colors;
        let max = items.max
        let min = items.min
        let discount = items.discount
        if ((items.initialType == "category") || (items.initialType == "search")) {
          this.initialType = items.initialType;
          this.filterTerm = items.filterTerm;
        }
        if((this.initialType!="category")&&(this.initialType!="search")){
          this.initialType="filter"
        }
        if (JSON.stringify(brands) == JSON.stringify([])) {
          this.brandService.getBrands().subscribe((allBrands) => {
            allBrands.forEach(b => brands.push(b.name));
          })
        }
        if (JSON.stringify(colors) == JSON.stringify([])) {
          this.colorService.getColors().subscribe((allColors) => { allColors.forEach(c => colors.push(c.name)) })
        }
        this.applyFilter(brands, colors, min, max, discount)

      })
    }
  }


  ngOnDestroy() { }

}


