import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAppoinment } from 'src/app/Interfaces/iappoinment';
import { AppoinmentService } from 'src/app/Services/Entity_Services/appoinment.service';

@Component({
  selector: 'app-doctor-add-appointment',
  templateUrl: './doctor-add-appointment.component.html',
  styleUrls: ['./doctor-add-appointment.component.css'],
})
export class DoctorAddAppointmentComponent implements OnInit {
  constructor(private appointServ: AppoinmentService) {}
  ngOnInit(): void {
    this.id = localStorage.getItem('UserId');
    this.id = JSON.parse(this.id);
    console.log(this.id);
    this.getAppointBydr();
  }

  //fields
  id: number | any;
  appointments: number | any;
  day: any;
  daysArabic: any;
  daysForNgfor: any = [];
  startTime: any = [];
  endTime: any = [];
  pageload = false;
  // ---------------------------------------------------
  getAppointBydr() {
    this.appointServ.GetAllByDoctor(this.id).subscribe((res) => {
      this.appointments = res.body;
      console.log(this.appointments);
      this.pageload = true;
      for (let i = 0; i < this.appointments.length; i++) {
        this.day = new Date(this.appointments[i].start_date)
          .toDateString()
          .split(' ')[0];

        this.daysForNgfor.push(
          new Date(this.appointments[i].start_date).toLocaleString('ar-eg', {
            weekday: 'long',
          })
        );
        this.startTime.push(
          //new Date(this.appointments[i].start_date).getHours()
          new Date(this.appointments[i].start_date).toLocaleString('en-EG', {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        console.log(
          new Date(this.appointments[i].end_date).toLocaleString('en-EG', {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        this.endTime.push(
          new Date(this.appointments[i].end_date).toLocaleString('en-EG', {
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        console.log(this.startTime[i]);
        console.log(this.endTime[i]);
      }

      console.log(this.appointments);
      console.log(this.day);
    });
  }

  removeAppoint(val: any, e: any) {
    console.log(val.value);
    if (confirm('هل انت متأكد ')) {
      this.appointServ.Delete(val.value, this.id).subscribe((res) => {
        e.target.parentElement.parentElement.parentElement.remove();
        console.log(     e.target.parentElement.parentElement);
        
      });
    }
  }

  appointForm = new FormGroup({
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
  });
  get startConrol() {
    return this.appointForm.controls.startTime;
  }
  get endControl() {
    return this.appointForm.controls.endTime;
  }

  pastDateFlage = false;
  nowDateFlag = false;
  endDateFlag = false;
  pastEndDateFlag = false;
  notValid = false;
  addAppoint(ev: any, start: any, end: any) {
    //--------------------------------------
    this.notValid = false;
    this.nowDateFlag = false;
    this.pastDateFlage = false;
    this.endDateFlag = false;
    this.pastEndDateFlag = false;
    const date = new Date(start.value);
    let endDate = new Date(end.value);
    const DateNow = new Date(Date.now());
    //---------------------------------------------------------
    //model sent to server
    const model: IAppoinment = {
      start_date: date,
      end_date: endDate,
      Dr_id: this.id,
      appoint_id: 0,
      patients_per_day: 0,
      type: false,
      id: 0,
    };
    //---------------------------------------------------
    console.log(date.getHours());
    console.log(endDate.getHours());
    console.log(DateNow.getDate());
    //check past date
    if (date.getFullYear() < 2023) this.pastDateFlage = true;
    //check day is now
    if (date.getDate() == DateNow.getDate()) this.nowDateFlag = true;
    // check if end date is not equal to the day of start date
    if (endDate.getDate() != date.getDate()) this.endDateFlag = true;
    // check if time of end date is not greater than start date
    if (endDate.getHours() < date.getHours()) this.pastEndDateFlag = true;
    if (this.appointForm.valid) {
      if (
        this.pastDateFlage ||
        this.nowDateFlag ||
        this.endDateFlag ||
        this.pastEndDateFlag
      ) {
        this.notValid = true;
        ev.preventDefault();
      } else {
        this.appointServ.Add(model).subscribe({
          next: (res) => {
            alert('تم الاضافة بنجاح');
            this.appointments.push(model);
            this.getAppointBydr();
            console.log(res);
          },
        });
      }
    } else {
      ev.preventDefault();
    }
  }
}
