import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { IAddress } from 'src/app/Interfaces/iaddress';
import { IclinicDoctor } from 'src/app/Interfaces/iclinic-doctor';
import { Idoctor } from 'src/app/Interfaces/idoctor';
import { IPatientAppoint } from 'src/app/Interfaces/ipatient-appoint';
import { ClinicDoctorService } from 'src/app/Services/Entity_Services/clinic-doctor.service';
import { ClinicService } from 'src/app/Services/Entity_Services/clinic.service';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { PatientAppointService } from 'src/app/Services/Entity_Services/patient-appoint.service';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {

  appointment:IPatientAppoint[]=[];
  Doctors:Idoctor|undefined;
  clinic:IclinicDoctor[]=[];
  Address:IAddress|undefined;
  DoctorsName:string[] =[];
  appointDate:string[]=[];
  startDate:string[]=[];
  endDate:string[]=[];
  getDay:string[]=[];
  fullBookingDate:string[]=[];
  temp:any;
  isLoading = false;
  isBooking=true;
  // isBooking=false;
  patientId=2; // get from local storage
constructor(private patientAppoint:PatientAppointService,private DrService:DoctorService , private clinicService:ClinicDoctorService) {}  // must change service

  ngOnInit(): void {
    this.patientAppoint.getAllAppointForPatient(this.patientId).subscribe({ 
       next: (e)=>{ 
        this.temp=e.body;
        this.appointment=this.temp;   
      
        if(this.appointment){ 
          
          // get DR name
          this.appointment.forEach(appoint => { 
            // get booking date
          const date=new Date(appoint.appoint.create_at).toLocaleDateString();
          this.appointDate.push(date);
          // get time and day for appoint
          
          const startDate = new Date(appoint.start_date);
          const formatter = new Intl.DateTimeFormat('ar', { weekday: 'long' });
          const dayName = formatter.format(startDate);
          this.getDay.push(dayName);
          this.fullBookingDate.push(startDate.toLocaleDateString())
          const options = { hour12: true };
          this.startDate.push(startDate.toLocaleTimeString('ar', options));

          const endDate =new Date(appoint.end_date);
          this.endDate.push(endDate.toLocaleTimeString('ar', options))
       
          
          this.clinicService. getClinicsByDrId(appoint.dr_id).subscribe({
            next:(res)=>{
                this.temp=res.body;
                this.clinic=this.temp; // get clinic 
                console.log(this.clinic[0].Dr_id);
                console.log(this.clinic[0].clinic_id);
///// get address using dr_id , clinic_id 
            },
            error:(e)=>console.log(e.error )
            
          });
           
            this.DrService.getDoctorById(appoint.dr_id).subscribe({
              next: (res)=>{
                this.temp=res.body;
                this.Doctors=this.temp;   //get DoctorName
                console.log(this.Doctors?.name +';');
                  if(this.Doctors != null)
                    this.DoctorsName.push(this.Doctors.name);
               
              },
              error:(e)=>console.log(e)
              
            }); 
           
            setTimeout(() => {
       this.isLoading = true;
            }, 2000);
      
          }); }
       },
       error:(e)=>{
        console.log(e.error);
        
        this.isBooking=false;
        setTimeout(() => {
          this.isLoading = true;
               }, 2000);
         
      } 
      } );

   
  }

}
