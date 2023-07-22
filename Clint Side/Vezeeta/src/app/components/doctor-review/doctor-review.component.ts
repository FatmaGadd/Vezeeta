import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { TokenService } from 'src/app/Services/Token/token.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-doctor-review',
  templateUrl: './doctor-review.component.html',
  styleUrls: ['./doctor-review.component.css']
})
export class DoctorReviewComponent implements OnInit {

  drId?:any;
  dr?:any;
  patientId?:any;
  hasappoinment?:any;
  constructor(private activatedRoute:ActivatedRoute, 
    private tokenService:TokenService, 
    private doctorService:DoctorService,
    private http:HttpClient,
    private location:Location
    ){
      this.activatedRoute.params.subscribe((params) => {
        this.drId = params['id'];
        this.doctorService.getDoctorById(this.drId).subscribe({
          next:(response:any) => {
            // console.log(response);
            this.dr = response.body;
            },
            error: (e) => console.error(e),
           complete: () => console.info('Success')
        })
      });
    this.patientId =  this.tokenService.GetUserId();

  }
  ngOnInit(): void {
    this.http.get(`https://localhost:7018/api/Review/hasAppoinment/${this.drId},${this.patientId}`).subscribe({
      next:(response:any) => {
        //console.log(response);
        this.hasappoinment = response;
        },
        error: (e) => console.error(e),
       complete: () => console.info('Success')
    })
  }
  addreviewform = new FormGroup({
  value:new FormControl('1',[Validators.required,Validators.min(1)]),
  comment:new FormControl('',[Validators.maxLength(150),Validators.required])
  })
  get GetValue(){
    return this.addreviewform.controls['value'];
  }
  get GetComment(){
    return this.addreviewform.controls['comment'];
  }
  addreview(e:any){
    // console.log(this.addreviewform);
    if (this.addreviewform.valid) {
      let r= {Dr_id:this.drId,patient_id:this.patientId,value:this.GetValue.value?.toString(),comment:this.GetComment.value}
       console.log(r);
      this.http.post("https://localhost:7018/api/Review",r).subscribe({
        next:(response:any) => {
          //console.log(response);
          this.location.back();
        },
          error: (e) => console.error(e),
         complete: () => console.info('Success')
      })
      
    }
  }

}
