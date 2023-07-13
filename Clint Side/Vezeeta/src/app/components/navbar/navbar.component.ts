import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name:string="kl";
  patientId:number=17;
  loginInfo:any;
  patient:IPatientAdd|undefined;
  constructor(private patientService:PatientService) {}
  ngOnInit(): void {
   this.patientService.GetById(this.patientId).subscribe({
    next:(p)=>{
      this.loginInfo=p.body;
      this.patient=this.loginInfo;
      if(this.patient!= null)
      this.name=this.patient?.name.toString();
    }
   })
  }
  

}
