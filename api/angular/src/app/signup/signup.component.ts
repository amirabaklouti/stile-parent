import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  checkbox = false;
  Login() {
    this.router.navigate(['/login']);
  }
  form: FormGroup
  ngOnInit(): void {
    this.infoForm();
  }
  ionViewWillEnter(){
    this.ngOnInit()
  }
pw
conf
response
  infoForm() { 
    this.form = this.formBuilder.group({
      username: ['', [Validators.required ,Validators.minLength(3),
        Validators.maxLength(15), Validators.pattern("^[A-Za-z](?:_?[a-z0-9]+){2,15}$")]],
      email: ['', [Validators.required , Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['',[ 
        Validators.required ,
        Validators.minLength(6),
        Validators.maxLength(8)]],
      confirm: ['',[ 
        Validators.required ,
        Validators.minLength(6),
        Validators.maxLength(8)
      ]]
    });

  }
  toggleCheckbox() {
    this.checkbox = !this.checkbox;
  }
  async onSubmit() {
   // debugger
    const value = this.form.value;
    if ((value.email == "")||(value.username == "")||(value.password == "")||(value.confirm == "")) {
      const toast = await this.toast.create({
        mode:'ios',
        position:'top',
        message: 'Please fill in all the required areas!',
        duration: 3000
      });
      toast.present();
    }
    else {
      if (value.password == value.confirm) {
        if (this.checkbox == false) {
          const toast = await this.toast.create({
            mode:'ios',
            position:'top',
            message: 'Please accept terms and conditions!',
            duration: 3000
          });
          toast.present();
        }
        else {
        const value = this.form.value;
        if (this.form.valid) {
        const user  = new FormData();
        user.append('username',value.username);
        user.append('email',value.email);
        user.append('password',value.password);
         this.signUp(this.form);
        }else{
          const toast = await this.toast.create({
            mode:'ios',
            position:'top',
            message: 'Please fill in all the areas with correct inputs!',
            duration: 3000
          });
          toast.present();  
        }
        }

    }
      else {
        const toast = await this.toast.create({
          mode:'ios',
          position:'top',
          message: 'Passwords do not match!',
          duration: 3000
        });
        toast.present();
      }
    }
  }
  constructor(private loadingController : LoadingController ,private toast: ToastController, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
  }
/*
signUp(user){
  let promise = new Promise((resolve, reject) => {
    this.authService.register(user).then(
      (response :any)=> { 
      JSON.parse(response) // Success
      console.log(response);
      resolve(response)
    },
    (err :any) =>{ 
          JSON.parse(err) // Error
          console.log(err);
          reject(err);
      }
      return promise;
  }
  
  );
*/
  async signUp(user){
    const load = await this.loadingController.create({
      spinner: 'crescent',
      duration: 1000,
      mode :'ios',
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
   load.present()
      this.authService.register(user).pipe(map((res : Response)=>res.json()))
      .subscribe(success => {
      },
      async (error : any) => {
        if(error.error !== undefined){
          if(error.error.message === "Error: Username is already taken!"){
            const toast = await this.toast.create({
              mode:'ios',
              position:'top',
              message: 'Username is already taken!',
              duration: 2000
            });
            toast.present();
          }
          if(error.error.message === "Error: Email is already in use!"){
            
            const toast = await this.toast.create({
              mode:'ios',
              position:'top',
              message: 'Email is already used in other account !',
              duration: 2000
            });
            toast.present();
        }
      }else{
        const value = this.form.value;
        
        const toast = await this.toast.create({
          mode:'ios',
          position:'top',
          message: 'Account created successfully !',
          duration: 3000
        });
        toast.present().then( data =>{
          this.router.navigateByUrl('/login', { state: { usernameSignedUp : value.username ,passwordSignedUp :value.password  } });
        } );
    
     //   this.router.navigate(['/login']);
      }
      
      }
  
      )
}



}
