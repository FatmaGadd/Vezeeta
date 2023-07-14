import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit {

  constructor(private patientService:PatientService , private router:Router) {}
  showError=false;
  erorrFromServer :string='';
formConfirmCode:any;
temp:any;
data:IPatientAdd|undefined;
ngOnInit(): void {
 this.formConfirmCode = new FormGroup({
   patientCode:new FormGroup('',Validators.required),
   });
}
get getCode(){
  return this.formConfirmCode.controls['patientCode']
}
forgetPass(e:any){
  e.preventDefault();
  
  if(this.formConfirmCode.status=='VALID'){
    console.log('valid');
    }
       setTimeout(() => {
        
  this.router.navigate(['/resetPassword']);
       }, 2000);
 
  }
}



 


