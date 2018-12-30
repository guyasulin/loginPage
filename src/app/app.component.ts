import { HttpServiceService } from './http-service.service';
import {Component} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loginData : any;
  isUserValid :boolean;
  countErrors:number; 

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  
  matcher = new MyErrorStateMatcher();
  
  constructor(private httpServiceService:HttpServiceService){
    this.loginData = {};
    this.countErrors=0
  }

  login(){
    if(this.emailFormControl.valid == true && this.passwordFormControl.valid){
      this.httpServiceService.login(this.loginData)
      .subscribe((result) => {
        this.isUserValid = true;
      },
      (err) => {
        
          this.countErrors++;
        this.isUserValid = false;
        console.log(err);
      })
  }
}
}