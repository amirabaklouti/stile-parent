import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { CollectionComponent } from './collection/collection.component';
import { DetectedClothesComponent } from './detected-clothes/detected-clothes.component';
import { DiscoverComponent } from './discover/discover.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenubarComponent } from './menubar/menubar.component';
import { OutfitsComponent } from './outfits/outfits.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchImageComponent } from './search-image/search-image.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';
import { StartComponent } from './start/start.component';
import { TopComponent } from './top/top.component';
import { TryClothComponent } from './try-cloth/try-cloth.component';

import { WardrobeComponent } from './wardrobe/wardrobe.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'start',
    pathMatch: 'full',
    component: StartComponent,
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SignupComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'main',
    pathMatch: 'full',
    component: MainComponent,
  },
  {
    path: 'menubar',
    pathMatch: 'full',
    component: MenubarComponent,
  },
  {
    path: 'outfits',
    pathMatch: 'full',
    component: OutfitsComponent,
  },
  {
    path: 'cart',
    pathMatch: 'full',
    component: CartComponent,
  },
  {
    path: 'profile',
    pathMatch: 'full',
    component: ProfileComponent,
  },
  {
    path: 'categories',
    pathMatch: 'full',
    component: CategoriesComponent,
  },
  {
    path: 'action/:type/:term',
    component: SearchComponent,
  },
  {
    path: 'action/:type',
    component: SearchComponent,
  },
  {
    path: 'wardrobe',
    pathMatch: 'full',
    component: WardrobeComponent,
  },
  {
    path: 'bookmarks',
    pathMatch: 'full',
    component: FavoritesComponent,
  },
 /* {
    path: 'header',
    pathMatch: 'full',
    component: HeaderComponent,
  },*/
  {
    path: 'detected-clothes',
    pathMatch: 'full',
    component: DetectedClothesComponent,
  },
  {
    path: 'search-image',
    pathMatch: 'full',
    component: SearchImageComponent,
  },
  {
    path: 'try-cloth',
    pathMatch: 'full',
    component: TryClothComponent,
  },
    {
    path: 'collection',
    pathMatch: 'full',
    component: CollectionComponent,
  },

  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
  },
  {
    path: 'discover',
    pathMatch: 'full',
    component: DiscoverComponent,
  },
  {
    path: 'top',
    component: TopComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
