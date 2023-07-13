import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-patient-change-password',
  templateUrl: './patient-change-password.component.html',
  styleUrls: ['./patient-change-password.component.css']
})
export class PatientChangePasswordComponent implements  OnInit {
  showSpinner = false;
  alertDiv=false;
  loginInfo:any;
  oldPassfromServer:any;
  newPassword:any;
  showError = false;
patientInfo:IPatientAdd|undefined;
  constructor(private patientService:PatientService) {}
  formChangePass:any;
  userLoginData:any;
  patient:IPatientAdd  |undefined;
  patientId:number =4; // get from session after login
  ngOnInit() { 
    this.formChangePass =   new FormGroup({
      patientPassword :new FormControl('',Validators.required ),
      patientNewPassword :new FormControl('',[Validators.required ,  Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z\u0621-\u064A])(?=.*[@#$%]).{8,}$/)]),
      patientName: new FormControl(""),
      patientEmail :new FormControl('' ),
      patientPhone :new FormControl(''),
      //  patientBirth_date :new FormControl('' ), 
       patientAddress :new FormControl( ''),
        patientGender :new FormControl(''),
    });

    this.patientService.GetById(this.patientId).subscribe({
      next:  (a) => {
        this.userLoginData =  a.body;
         this.patient= this.userLoginData; 
     },
    error: (e) => console.error(e),
 
    });

}
get getPass(){
  return this.formChangePass.controls["patientPassword"]
}
  get getNewPass(){
      return this.formChangePass.controls["patientNewPassword"]
    }
    updatePass(e:any){
  e.preventDefault();   
        
      if( this.formChangePass.status === 'VALID'){  
        this.showSpinner = true;
        this.patientService.GetById( this.patientId).subscribe({
          
              error: (e) => console.log(e.error),
              next: (p) => {
                  
    this.loginInfo = p.body ;
    this.patientInfo=this.loginInfo;
    const oldPasswordFromUser = this.getPass.value;
      const oldPassfromServer=this.patientInfo?.password;
      const newPassword = this.getNewPass.value;

    if(oldPassfromServer == oldPasswordFromUser){
      
      this.getPass.setValue(newPassword);
     if(this.patientInfo != null){
      this.patientService.Update(this.patientId,this.formChangePass.value).subscribe({error:(w)=>console.log(w.error)})
     }
     
      setTimeout(() => {
        this.showSpinner = false;
      }, 2000);

      setTimeout(() => {
        this.alertDiv=true;
      }, 2100);

    }   
              }
            });
      }else{
        this.showError = true;
      }
    }
}
