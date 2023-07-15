import { PatientAppointService } from './../../../Services/Entity_Services/patient-appoint.service';
import { PatientService } from './../../../Services/Entity_Services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppoinmentService } from './../../../Services/Entity_Services/appoinment.service';
import { TokenService } from './../../../Services/Token/token.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppoinment } from 'src/app/Interfaces/iappoinment';
import { IAddAppointToPatient } from 'src/app/Interfaces/iadd-appoint-to-patient';

@Component({
  selector: 'app-take-appoinment',
  templateUrl: './take-appoinment.component.html',
  styleUrls: ['./take-appoinment.component.css']
})
export class TakeAppoinmentComponent implements OnInit{
  appoinmentId?:any;
  drId?:any;
  appoinment?:any;
  patient?:any;

  constructor(private tokenService:TokenService,
    private appoinmentService:AppoinmentService, 
    private router:Router,
    private activatedRoute:ActivatedRoute, 
    private patientService:PatientService,
    private patientAppointService:PatientAppointService
    ){
    this.activatedRoute.params.subscribe((params) => {
      this.appoinmentId = params['id'];
      this.drId = params['drid'];
    });
  }
  ngOnInit(): void {
    
      this.appoinmentService.GetById(this.appoinmentId,this.drId).subscribe({
        next:(response:any) => {
         // console.log(response);
          this.appoinment = response.body;
         },
         error: (e) => console.error(e),
        complete: () => console.info('Success')
      })
      this.patientService.GetById(Number(this.tokenService.GetUserId())).subscribe({
        next:(response:any) => {
          //console.log(response);
          this.patient = response.body;
         },
         error: (e) => console.error(e),
        complete: () => {
          console.info('Success'),
          //console.log(this.patient);
          
          this.GetName.setValue(this.patient.name);
          this.GetMobile.setValue(this.patient.phone);
          this.GetEmail.setValue(this.patient.email);
      }
      })
  }
  reservationForm = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    mobile: new FormControl('',[Validators.required,Validators.minLength(11)]),
    email: new FormControl()
  })
  get GetName(){
    return this.reservationForm.controls['name'];
  }
  get GetEmail(){
    return this.reservationForm.controls['email'];
  } get GetMobile(){
    return this.reservationForm.controls['mobile'];
  }
submit(e:Event){
  e.preventDefault();
  debugger
  if (this.reservationForm.valid) {
    //update with APPOINMENT DIRECT or add with appoinpatient direct
    // let appointupdate:IAppoinment={id:this.appoinmentId,Dr_id:this.drId,appoint_id:}
    // this.appoinmentService.Update(this.appoinmentId,this.drId,appointupdate)
    //navigate to success
    let appPatient:IAddAppointToPatient={id:this.patient.id}
    this.patientAppointService.AddPatient_Appoinment(appPatient,this.patient.id).subscribe({
      next:(response:any) => {
        console.log(response);
       },
       error: (e) => console.error(e),
      complete: () =>console.info('Success')
    })
  }
}
change(e:any){
console.log(e.target.checked);
  if (e.target.checked) {
    this.GetName.setValue(null);
    this.GetMobile.setValue(null);
    this.GetEmail.setValue(null);
  } else {
    this.GetName.setValue(this.patient.name);
    this.GetMobile.setValue(this.patient.phone);
    this.GetEmail.setValue(this.patient.email);
  }
}

}
