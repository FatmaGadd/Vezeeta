import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { IsActiveMatchOptions } from '@angular/router';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';


@Component({
  selector: 'app-patient-account',
  templateUrl: './patient-account.component.html',
  styleUrls: ['./patient-account.component.css']
})
export class PatientAccountComponent implements OnInit  { 

  constructor(private patientService:PatientService) {}
 forgetPassActivate =false;
profileActiviate=true;
passDiv:any;
profileDiv:any;
// forget pass component 

showSpinner = false;
alertDiv=false;
loginInfo:any;
oldPassfromServer:any;
newPassword:any;
showError = false;
patientInfo:IPatientAdd|undefined;
formChangePass:any;
userLoginData:any;
patient:IPatientAdd  |undefined;
patientId:number =4; // get from session after login

/// profile
formProfile:any;
initialFormValues:any;

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


  /////// profile
  this.formProfile =   new FormGroup({
    patientName: new FormControl( '', [Validators.required, Validators.minLength(3)]),
    patientEmail :new FormControl( '',[Validators.required ,Validators.email]),
    patientPhone :new FormControl( '',[Validators.required ,Validators.pattern(/^01[0125][0-9]{8}$|^2[0-5][0-9]{6}$/)]),
     patientBirth_date :new FormControl( '',Validators.required), 
     patientAddress :new FormControl( '',Validators.required),
     patientPassword :new FormControl(), patientGender :new FormControl(),
     });
this.patientService.GetById(this.patientId).subscribe({
  next:  (a) => {
    this.userLoginData =  a.body;
     this.patient= this.userLoginData;
     this.initialFormValues={
      patientName: this.patient?.name,
      patientEmail: this.patient?.email,
      patientPhone: this.patient?.phone,
      patientBirth_date: this.patient?.birth_date,
      patientAddress: this.patient?.address,
      patientPassword :this.patient?.password,
      patientGender:this.patient?.gender,
    };
    this.formProfile.setValue(this.initialFormValues);
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
forgetPass(){
  this.forgetPassActivate=true;
  this.passDiv = document.getElementById('Forgetpass');
  this.passDiv.classList.add('linkActive');
  this.profileDiv.classList.remove('linkActive');
this.profileActiviate=false;
}

///////////////////////////////patientProfile

  get getName(){
    return this.formProfile.controls["patientName"];
  }
  
  get getPhone(){
    return this.formProfile.controls["patientPhone"]
  }
  get getEmail(){
    return this.formProfile.controls["patientEmail"]
  }
  get getBirth(){
    return this.formProfile.controls["patientBirth_date"]
  }
  get getAddress(){
    return this.formProfile.controls["patientAddress"]
  }
  

   updateInfo(e:any){
    e.preventDefault();  
    console.log(this.formProfile.status);  
    console.log(this.formProfile.value); 
      
    if( this.formProfile.status === 'VALID'){  
      this.showSpinner = true;
      this.patientService.Update(this.patientId, this.formProfile.value).subscribe({
    
            error: (e) => console.log(e.error),
            complete: () => {
              setTimeout(() => {
                this.showSpinner = false;
              }, 2000);

              setTimeout(() => {
                this.alertDiv=true;
              }, 2100);
            }
          });
    }
  }

  resetForm() :void{
    this.formProfile.setValue(this.formProfile.value);
  }

  getProfile(){
    this.forgetPassActivate=false;
    this.profileDiv = document.getElementById('profile');
  this.profileDiv.classList.add('linkActive');
  this.passDiv.classList.remove('linkActive');
  this.profileActiviate=true;
  }
  
  }



