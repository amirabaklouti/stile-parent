import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { SearchComponent } from './search/search.component';
import { WardrobeComponent } from './wardrobe/wardrobe.component';
import { HeaderComponent } from './header/header.component';
import { DetectedClothesComponent } from './detected-clothes/detected-clothes.component';
import { FilterComponent } from './filter/filter.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ClothCardComponent } from './cloth-card/cloth-card.component';
import { StartComponent } from './start/start.component';
import { TryClothComponent } from './try-cloth/try-cloth.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { OutfitsComponent } from './outfits/outfits.component';
import { TopComponent } from './top/top.component';
import { BottomsComponent } from './bottoms/bottoms.component';
import { FootwearComponent } from './footwear/footwear.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { ImageCropperModule } from 'ngx-img-cropper';
import { SearchImageComponent } from './search-image/search-image.component';
import { CollectionComponent } from './collection/collection.component';

import { SwiperModule } from "swiper/angular";
import { UploadImgComponent } from './upload-img/upload-img.component';
import { CartComponent } from './cart/cart.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { SettingsComponent } from './settings/settings.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { DiscoverComponent } from './discover/discover.component';
import { NgxInfiniteScrollerModule } from 'ngx-infinite-scroller';
@NgModule({
  declarations: [AppComponent,JwPaginationComponent,BottomsComponent,DiscoverComponent,SideMenuComponent,SettingsComponent,CollectionComponent,FootwearComponent,TopComponent, OutfitsComponent,TryClothComponent,StartComponent,ClothCardComponent,ProductInfoComponent,FavoritesComponent,NotificationsComponent,FilterComponent,HeaderComponent,DetectedClothesComponent,WardrobeComponent,LoginComponent,SignupComponent, MenubarComponent, MainComponent,ProfileComponent, CategoriesComponent, SearchComponent,SearchImageComponent,UploadImgComponent,CartComponent,ImageViewerComponent],

  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,FormsModule,ImageCropperModule,
   MatChipsModule, HttpClientModule,ReactiveFormsModule,SwiperModule, NoopAnimationsModule ,NgxInfiniteScrollerModule],
  exports:[MenubarComponent],
  providers: [
 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}

