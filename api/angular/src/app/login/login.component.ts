import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import moment from 'moment';
import { AuthService } from '../_services/auth.service';
import { ClothesService } from '../_services/clothes.service';
import { CollectionService } from '../_services/collection.service';
import { OutfitService } from '../_services/outfit.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { WardrobeService } from '../_services/wardrobe.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  usernameValue
  passwordValue

  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private clothesService : ClothesService , private outfitService :OutfitService, private collectionService :CollectionService, private wardrobeService : WardrobeService ,private userService : UserService ,private authService: AuthService, private toast: ToastController, private router: Router, private tokenStorage: TokenStorageService, private formBuilder: FormBuilder ) { }
  
  
  ionViewWillEnter(){
    this.ngOnInit()
  }

  ngOnInit() {
    if(history.state.usernameSignedUp !==undefined && history.state.passwordSignedUp !==undefined){ 
      this.form.controls['username'].setValue(history.state.usernameSignedUp);
      this.form.controls['password'].setValue(history.state.passwordSignedUp);
      
      this.form = this.formBuilder.group({
        username: [history.state.usernameSignedUp, Validators.required],
        password: [history.state.passwordSignedUp, Validators.required]
      });

     }else{
      this.infoForm();
     }

 
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.checkUserFirstLogin();
    //  debugger
    //  this.roles = this.tokenStorage.getUser().roles;
    }
  }
  infoForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }
  

  checkUserFirstLogin(){
    const id = this.tokenStorage.getUser().id
    this.userService.checkUserFirstLogin(id).subscribe((data :any) =>{ 
    if(data == false || null){
      this.userService.firstLoginSeen().subscribe();
      this.router.navigate(["/start"]);
      this.getUserInfo()
    }else{
      this.router.navigate(["/main"]);
      this.getUserInfo()
    }
})
  }

  getUserInfo(){
    let wardrobes = []
    let collections = []
    let outfits = []
    this.userService.getUser().subscribe((data:any) => { 
      localStorage.setItem('birthDate',JSON.stringify(moment(data.birthDate).format("YYYY-MM-DD")))
      localStorage.setItem('gender',JSON.stringify(data.sexe))
      localStorage.setItem('profileImg',JSON.stringify(data.profileImg))
      localStorage.setItem('profileName',JSON.stringify(data.username))
      localStorage.setItem('phone',JSON.stringify(data.phone))
      localStorage.setItem('email',JSON.stringify(data.email)
    )})
     this.wardrobeService.checkGroupes().subscribe((data :any)=>{
      for(let i = 0;i<data.length;i++) { 
        wardrobes = [...wardrobes, data[i]]; 
      localStorage.setItem('wardrobes',JSON.stringify(wardrobes))  
     }
    });
    this.collectionService.getCollectionGroupByUser().subscribe((data:any)=> {
      for(let i = 0;i<data.length;i++) { 
        collections = [...collections, data[i]]; 
      }
      localStorage.setItem('collection',JSON.stringify(collections))
    });
    this.outfitService.getOutfitsByUser().subscribe(data =>{
      for (let i = 0; i < data.length; i++) {
      outfits = [...outfits ,data[i]]
      }
      localStorage.setItem('outfits',JSON.stringify(outfits)) 
    })

    this.clothesService.findFavoritesByUser().subscribe((clothes:any) => {
      let arr = []
      clothes.forEach(element => {
        arr.push(element.id)
      });
     localStorage.setItem('favorites',JSON.stringify(clothes))
     localStorage.setItem('favoritesId',JSON.stringify(arr))
    })
  }
  
  onSubmit() {
    this.form.controls['username'].setValue(this.usernameValue);
    this.form.controls['password'].setValue(this.passwordValue);
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.checkUserFirstLogin();
      },
      async err => {
        this.isLoginFailed = true;
        const value = this.form.value;
        if (value.username == "" || value.password == "") {
          const toast = await this.toast.create({
            mode:'ios',
            position:'top',
            message: 'Please fill in all your Credentials!',
            duration: 3000
          });
          toast.present();
        }
        else {
          const toast = await this.toast.create({
            mode:'ios',
            position:'top',
            message: 'Wrong Login Credentials!',
            duration: 3000
          });
          toast.present();
        }

      }
    );
  }
  reloadPage() {
    window.location.reload();
  }
  Signup() {
    this.router.navigate(['/signup']);
  }
}