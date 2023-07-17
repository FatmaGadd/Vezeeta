import { ActivatedRoute } from '@angular/router';
import { AppoinmentService } from './../../../Services/Entity_Services/appoinment.service';
import { TokenService } from './../../../Services/Token/token.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-saved-appoinment',
  templateUrl: './saved-appoinment.component.html',
  styleUrls: ['./saved-appoinment.component.css']
})
export class SavedAppoinmentComponent implements OnInit {
  appoinmentId?:any;
  drId?:any;
  appoinment?:any;
  dr_clinic?:any;
  clinicaddress?:any;
  patientname?:any;

constructor(private tokenService:TokenService, 
  private appoinmentService:AppoinmentService,
  private activatedRoute:ActivatedRoute,
  private http:HttpClient,

  ){
    this.activatedRoute.params.subscribe((params) => {
      this.appoinmentId = params['id'];
      this.drId = params['drid'];
      this.patientname = tokenService.GetUsername();
    });
  }
  ngOnInit(): void {
    this.appoinmentService.GetById(this.appoinmentId,this.drId).subscribe({
      next:(response:any) => {
        //console.log(response);
         this.appoinment = response.body;
        //  console.log(this.appoinment);
         
         this.http.get(`https://localhost:7018/api/Dr_clinic/${this.appoinment.dr.id}`).subscribe({
          next:(response:any) => {
            //console.log(response);
            this.dr_clinic = response;
            this.clinicaddress = this.dr_clinic.clinic.address;
          //  console.log(this.dr_clinic);
            
          },
          error: (e) => console.error(e),
          complete: () => console.info('Success')
         })
        },
        error: (e) => console.error(e),
       complete: () => console.info('Success')
    })
  }
}
