import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  constructor(private patient:PatientService , private router:Router) {}
  formRestPass:any;
  showError=false;
  isConfirm=true;
  ngOnInit(): void {
    this.formRestPass = new FormGroup({
      patientPassword :new FormControl('',[Validators.required ,  Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z\u0621-\u064A])(?=.*[@#$%]).{8,}$/)]),
      confirmPassword : new FormControl('',Validators.required)
    });
  }
  get getNewPass(){
    return this.formRestPass.controls['patientPassword'];
  }
 get getConfirmPass(){
  return this.formRestPass.controls['confirmPassword'];
 }
  resetPass(e:any){
    e.preventDefault();
  
    
    if(this.formRestPass.status === 'VALID' ){
      if(this.getNewPass.value === this.getConfirmPass.value){
        this.isConfirm=true;
        // update user datta with new pass  ??how with token
       
        // go to login after update daa
        
  this.router.navigate(['/login']);
}
    }else{
      this.showError=true;
      if(this.getNewPass.value !== this.getConfirmPass.value){
                  this.isConfirm=false;
      }
    }
  }
}
