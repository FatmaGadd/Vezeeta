import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
import * as emailjs from 'emailjs-com';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})

export class ForgetPasswordComponent implements OnInit {

  constructor(private patientService:PatientService , private router:Router) {}
  showError=false;
  erorrFromServer :string='';
formForgetPass:any;
temp:any;
data:IPatientAdd|undefined;
ngOnInit(): void {
 this.formForgetPass = new FormGroup({
  patientEmail :new FormControl("",[Validators.required ,Validators.email]),
  patientName: new FormControl( ''),
  patientPhone :new FormControl( ''),
   patientBirth_date :new FormControl( ''), 
   patientAddress :new FormControl( ''),
   patientPassword :new FormControl(), patientGender :new FormControl(),
   patientCode:new FormGroup(''),
   });
}
get getEmail(){
  return this.formForgetPass.controls['patientEmail']
}
get getCode(){
  return this.formForgetPass.controls['patientCode']
}
forgetPass(e:any){
  e.preventDefault();
  
  if(this.formForgetPass.status=='VALID'){
    console.log('valid');
     // search by mail
 this.patientService.GetByEmail(this.getEmail.value).subscribe({
  next:(p)=>{
    this.temp=p.body;
    this.data=this.temp;
    // send Link to this Email how???
    console.log(this.data);
    if(this.data != undefined){
      console.log(this.data.id);
      this.GenerateCodeAndSendEmail(this.data.email , this.data.id);
    }
       setTimeout(() => {
        
  this.router.navigate(['/confirmCode']);
       }, 2000);
  },
    error:(e)=>{
      console.log(e.error);
      this.erorrFromServer=e.error;
      console.log(this.getEmail);
      
    }
    
 });
    
  }else{
    this.showError=true;
  }
}


GenerateCodeAndSendEmail(email:any,user_id:number) {
  
// Generate a random code
 const code: number = Math.floor(Math.random() * 1000000);
 // save code in DB 
 this.getCode.setValue(code);
 console.log(code);
 
 this.patientService.Update(user_id,this.formForgetPass).subscribe({
  next:(e)=>console.log(e),
  error:(e)=>console.log(e.error)
  
  
 });
 // send Email
  emailjs.init('txV5RAwzRQ6JTKJqh');
  const templateParams = {
    email_to: email,
    to_name: 'Recipient Name',
    fullname: 'Your Name',
    code :code,
   };

  emailjs.send('service_ztuz25h', 'template_c434x9p', templateParams, 'txV5RAwzRQ6JTKJqh')
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }, (error) => {
      console.log('FAILED...', error);
    });
}
 
}
