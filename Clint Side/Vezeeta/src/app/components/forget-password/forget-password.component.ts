import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'jquery';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private patientService:PatientService) {}
  showError=false;
  erorrFromServer :string='';
formForgetPass:any;

ngOnInit(): void {
 this.formForgetPass = new FormGroup({
  patientEmail :new FormControl("",[Validators.required ,Validators.email]),
 });

}
get getEmail(){
  return this.formForgetPass.controls['patientEmail']
}
forgetPass(e:any){
  e.preventDefault();
  
  if(this.formForgetPass.status=='VALID'){
    console.log('valid');
     // search by mail
 this.patientService.GetByEmail(this.getEmail).subscribe({
  next:(p)=>{
    console.log(p);
    // send Link to this Email how???
  },
    error:(e)=>{
      console.log(e.error);
      this.erorrFromServer=e.error;
    }
    
 });
    
  }else{
    this.showError=true;
  }
}
}
