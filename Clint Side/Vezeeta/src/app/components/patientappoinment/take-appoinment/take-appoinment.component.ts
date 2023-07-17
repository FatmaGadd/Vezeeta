import { PatientAppointService } from './../../../Services/Entity_Services/patient-appoint.service';
import { PatientService } from './../../../Services/Entity_Services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppoinmentService } from './../../../Services/Entity_Services/appoinment.service';
import { TokenService } from './../../../Services/Token/token.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppoinment } from 'src/app/Interfaces/iappoinment';
import { IAddAppointToPatient } from 'src/app/Interfaces/iadd-appoint-to-patient';
import { HttpClient } from '@angular/common/http';
import { AppointmentURLs } from 'src/app/Environment/App.Const';

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
  invalid = false;
  constructor(private tokenService:TokenService,
    private appoinmentService:AppoinmentService, 
    private router:Router,
    private activatedRoute:ActivatedRoute, 
    private patientService:PatientService,
    private http:HttpClient
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
  if (this.reservationForm.valid) {
    let appointment = {id:this.appoinment.id,dr_id:this.drId,start_date:this.appoinment.start_date,end_date:this.appoinment.end_date,patients_per_day:this.appoinment.patients_per_day,type:this.appoinment.type,patientAppointDTO:{patient_id:this.patient.id}}
    //console.log(appointment);
    this.http.put(AppointmentURLs.GetById_Put_Delete(this.appoinment.id,this.drId),appointment).subscribe({
      next:(response:any) => {
        //console.log(response);
        this.router.navigate([`/book/${this.appoinmentId}`]);
       },
       error: (e) => console.error(e),
      complete: () =>console.info('Success')
    })
  }
  else{
    this.invalid =  true;
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
