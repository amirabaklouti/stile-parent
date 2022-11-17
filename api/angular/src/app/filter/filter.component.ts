import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Color } from '../model/color';
import { Brand } from '../model/brand';
import { BrandService } from '../_services/brand.service';
import { ColorService } from '../_services/color.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input('initialType') initialType
  @Input('filterTerm') filterTerm
  result = []
  brands: Brand[] = []
  colors: Color[] = []
  saturation = 432;
  min = 10;
  max = 432;
  isChecked:boolean=false;
  changeValue(event) {
    this.min = event.detail.value.lower;
    this.max = event.detail.value.upper;
    if (isNaN(this.min) && isNaN(this.max)) {
      this.min = 10;
      this.max = 432;
    }
  }
  checkStatus(event){
    this.isChecked=event.detail.checked;
    console.log(this.isChecked)
  }

  getBrands() {
    this.brands;
    this.brandService.getBrands().subscribe(
      (brands) => {
        this.brands = brands;
        this.brands.map((obj) => {
          obj['select'] = false;
        })
      })
  }
  getColors() {
    this.colors;
    this.colorService.getColors().subscribe(
      (colors) => {
        this.colors = colors;
        this.colors.map((obj) => {
          obj['select'] = false;
        })
      })
  }
  public customFormatter(value: number) {
    return `${value}USD`
  }
  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }
  selectBrand(brand: any) {
    this.brands[this.brands.indexOf(brand)].select = !this.brands[this.brands.indexOf(brand)].select;
  }
  selectColor(color: any) {
    this.colors[this.colors.indexOf(color)].select = !this.colors[this.colors.indexOf(color)].select;
  }
  brandStyle(brand: any) {
    if (!this.brands[this.brands.indexOf(brand)].select) {
      return "true";
    }
  }
  colorStyle(color: any) {
    if (this.colors[this.colors.indexOf(color)].select) {
      return "true";
    }
  }
  selectedFilter() {
    this.result = []
    let selectedBrands=[]
    let selectedColors=[]
    this.brands.forEach(brand => {
      if (brand.select == true) {
        selectedBrands.push(brand.name);
      }
    })
    this.colors.forEach(color => {
      if (color.select == true) {
        selectedColors.push(color.name);
      }
    })
    if (isNaN(this.min) && isNaN(this.max)) {
      this.min = 10;
      this.max = 432;
    }
    if(JSON.stringify(selectedBrands)==JSON.stringify([])){
      this.brands.forEach(e => selectedBrands.push(e.name))
    }
    if(JSON.stringify(selectedColors)==JSON.stringify([])){
      this.colors.forEach(e => selectedColors.push(e.name))
    }
    const selectFilter = this.result;
    this.router.navigate(['/action', 'filter'], { queryParams: {brands: selectedBrands,colors:selectedColors,min:this.min,max:this.max,discount:this.isChecked, initialType:this.initialType, filterTerm:this.filterTerm} });
    this.dismiss();
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  clearAll() {
    this.saturation = 432;
    for (let i = 0; i < this.brands.length; i++) {
      this.brands[i].select = false;
    }
    for (let i = 0; i < this.colors.length; i++) {
      this.colors[i].select = false;
    }
    this.isChecked=false;

  }
  constructor(private colorService: ColorService, private brandService: BrandService, private modalCtrl: ModalController, private router: Router) {
    this.min = 10;
    this.max = 432;
    this.getColors();
    this.getBrands();
  }

  ngOnInit() {


  }

}
