import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit{
  showSpinner = false;
  alertDiv=false;
    constructor(private patientService:PatientService) {}
    formProfile:any;
    userLoginData:any;
    patient:IPatientAdd  |undefined;
    initialFormValues:any;
    patientId:number =4; // get from session after login
  
        ngOnInit() :void{ 

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
    }
