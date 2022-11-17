import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonModal, IonSlides } from '@ionic/angular';
import {Location} from '@angular/common';
import { isNumber } from 'util';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  pageIndex
  slided =false
  returned =true
 
  indx=0

  clothesToBuy = []

  somme = 0
  total = 0
  shipping = 24
// @ViewChild('Slide', { static: true }) Slide: IonSlides;
//  card = document.getElementById('Slide');
@ViewChild(IonModal) modal: IonModal;

Slide: HTMLCollectionOf<Element> = document.getElementsByClassName('Slide');
  constructor(private location: Location,private router:Router) { }

 

  ngOnInit() {
    this.getClothesToBuy()
   
   
  }
   getClothesToBuy() {
    
    let keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
      if(!isNaN(Number(keys[i])) && keys[i] !== 'phone'){
        this.clothesToBuy.push(JSON.parse(localStorage.getItem(keys[i])));
      }

    }
    this.calculSomme()
}

  onSlideChange() {
 //  this.Slide.style.transform = "translate3d(100px, 0px, 0px)"
 //  this.Slide.style.transitionDuration ="500ms";
if(this.returned=true){
  let important =" "
  this.Slide[0].setAttribute("style", 'transform:translate3d(30%, 0px, 0px)'+important+';transition-duration:500ms');
  this.slided=true
  this.returned=false
}


  }
  return(){
    if(this.slided=true ){
      if( this.returned=false) {
       // this.Slide[0].removeAttribute("transform")
        this.Slide[0].setAttribute("style", "transform:translate3d(0px, 0px, 0px);transition-duration:500ms");
        this.slided=false
        this.returned =true
      }
    }
   
  }
  backClicked() {
    this.location.back();
  }

  next(){
    this.indx = this.indx + 1
  }
  previous(){
    this.indx = this.indx -1
  }


  deleteClothFrom(cloth){
  this.clothesToBuy =  this.clothesToBuy.filter(el => el !== cloth)
    localStorage.removeItem(cloth.id)
   // this.getClothesToBuy()
    var element = document.getElementById("e"+cloth.id); element.remove()
    this.calculSomme();
  }
 clothesPlus(clothrs){
  if(clothrs.count>=1){
    clothrs.count =  clothrs.count +1
    clothrs.sum = clothrs.count*clothrs.price
    this.calculSomme()
  }

 }
 clothesMinus(clothrs){
  if(clothrs.count>1){
    clothrs.count =  clothrs.count -1
    clothrs.sum = clothrs.count*clothrs.price
    clothrs.sum = parseFloat(clothrs.sum).toFixed(2)
    this.calculSomme()
  }
}
  calculSomme(){
  this.somme = 0
  this.total = 0
    this.clothesToBuy.forEach(element => {
    this.somme = this.somme + element.sum
    this.somme = parseFloat(Number(this.somme).toFixed(2))
    });
    if(this.somme !==0){
      this.total =   this.somme + this.shipping
      this.total = parseFloat(Number(this.total).toFixed(2)) 
    }else{
      this.total = 0
      this.shipping = 0
    }
 
  }
  pay(){

  }



  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

}
