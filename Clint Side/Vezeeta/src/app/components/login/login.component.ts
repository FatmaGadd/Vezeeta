import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showError=false;
formLogin:any; 
ngOnInit(): void {
  this.formLogin = new FormGroup({

    patientName:new FormControl(""),
    patientEmail :new FormControl("",[Validators.required ,Validators.email]),
    patientPhone :new FormControl("",[Validators.required]),
     patientBirth_date :new FormControl(""), 
     patientGender: new FormControl(''),
     patientAddress :new FormControl(''),
    patientPassword :new FormControl('',[Validators.required]),
 
  });
}
get getPhone(){
  return this.formLogin.controls["patientPhone"]
}
get getEmail(){
  return this.formLogin.controls["patientEmail"]
}

get getPass(){
  return this.formLogin.controls["patientPassword"]
}
Login(e:any){
  e.preventDefault();
  
  if(this.formLogin.status=='VALID'){
    console.log('valid');
    
  }else{
    this.showError=true;
  }
}
}
