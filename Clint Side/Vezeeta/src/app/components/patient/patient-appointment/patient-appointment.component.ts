import { Component, OnInit } from '@angular/core';
import { error } from 'jquery';
import { IAddress } from 'src/app/Interfaces/iaddress';
import { IclinicDoctor } from 'src/app/Interfaces/iclinic-doctor';
import { Idoctor } from 'src/app/Interfaces/idoctor';
import { IPatientAppoint } from 'src/app/Interfaces/ipatient-appoint';
import { AddressService } from 'src/app/Services/Entity_Services/address.service';
import { AppoinmentService } from 'src/app/Services/Entity_Services/appoinment.service';
import { ClinicDoctorService } from 'src/app/Services/Entity_Services/clinic-doctor.service';
import { ClinicService } from 'src/app/Services/Entity_Services/clinic.service';
import { DoctorService } from 'src/app/Services/Entity_Services/doctor.service';
import { PatientAppointService } from 'src/app/Services/Entity_Services/patient-appoint.service';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css'],
})
export class PatientAppointmentComponent implements OnInit {
  patientId = 0; // get from local storage
  appointment: IPatientAppoint[] = [];
  Doctors: Idoctor | undefined;
  clinic: IclinicDoctor[] = [];
  Address: IAddress | undefined;
  DoctorsName: string[] = [];
  appointDate: string[] = [];
  patientAppointState: string[] = [];
  startDate: string[] = [];
  endDate: string[] = [];
  getDay: string[] = [];
  fullBookingDate: string[] = [];
  temp: any;
  isLoading = false;
  isBooking = true;
  words = [
    'الأول',
    'الثاني',
    'الثالث',
    'الرابع',
    'الخامس',
    'السادس',
    'السابع',
    'الثامن',
    'التاسع',
    'العاشر',
    'الحادي عشر ',
    ' الثاني عشر',
    'الثالث عشر',
    ' الرابع عشر',
    'الخامس عشر',
    ' السادس عشر',
    'السابع عشر',
    'الثامن عشر',
    'التاسع عشر',
    'العشرون',
  ];

  constructor(
    private patientAppoint: PatientAppointService,
    private appointmentSerice: AppoinmentService,
    private DrService: DoctorService,
    private clinicService: ClinicDoctorService,
    private adressService: AddressService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem('UserId'))
      this.patientId = Number(localStorage.getItem('UserId'));

    if (this.patientId != 0)
      this.patientAppoint.getAllAppointForPatient(this.patientId).subscribe({
        next: (e) => {
          console.log(e);

          this.temp = e.body;
          this.appointment = this.temp;
          console.log(this.appointment);

          if (this.appointment) {
            // get DR name
            this.appointment.forEach((appoint) => {
              // get booking date
              const date = new Date(
                appoint.appoint.create_at
              ).toLocaleDateString();
              this.appointDate.push(date);
              // get time and day for appoint

              const startDate = new Date(appoint.start_date);
              const formatter = new Intl.DateTimeFormat('ar', {
                weekday: 'long',
              });
              const dayName = formatter.format(startDate);
              this.getDay.push(dayName);
              this.fullBookingDate.push(startDate.toLocaleDateString());
              const options = { hour12: true };
              this.startDate.push(startDate.toLocaleTimeString('ar', options));

              const endDate = new Date(appoint.end_date);
              this.endDate.push(endDate.toLocaleTimeString('ar', options));

              this.clinicService.getClinicsByDrId(appoint.dr_id).subscribe({
                next: (res) => {
                  this.temp = res.body;
                  this.clinic = this.temp; // get clinic
                  console.log(this.clinic);

                  this.clinic.forEach((clinic) => {
                    ///// get address using dr_id , clinic_id

                    this.adressService
                      .GetAddressByClinicId(clinic.clinic_id)
                      .subscribe({
                        next: (res) => {
                          this.temp = res.body;
                          this.Address = this.temp;
                        },
                        error: (e) => console.log(e.error),
                      });
                  });
                },
                error: (e) => console.log(e.error),
              });

              this.DrService.getDoctorById(appoint.dr_id).subscribe({
                next: (res) => {
                  this.temp = res.body;
                  this.Doctors = this.temp; //get DoctorName
                  console.log(this.Doctors?.name + ';');
                  if (this.Doctors != null)
                    this.DoctorsName.push(this.Doctors.name);
                },
                error: (e) => console.log(e),
              });

              setTimeout(() => {
                this.isLoading = true;
              }, 2000);
            });
          }
        },
        error: (e) => {
          console.log(e.error);
          this.isBooking = false;
          setTimeout(() => {
            this.isLoading = true;
          }, 2000);
        },
      });
  }

  deleteAppoint(e: any, id: number, appointPatientId: number) {

    ///// alert  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'هل تريد ألغاء الموعد ',
      text: "لايمكنك إعادة الموعد مره أخرى!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم,أريد الإلغاء!',
      cancelButtonText: 'لأريد الإلغاء',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(e.target.parentNode.parentNode);
        // make state = true in patient_appoint table 
        this.patientAppoint.DeletePatient_Appoinment(appointPatientId).subscribe();
        // make pationt_id = null in appointment
        //  this.appointmentSerice.softDelete(id).subscribe();
        // change style tr from table 
        var tr = e.target.parentNode.parentNode;
        tr.classList.add("unClickable");

        // tr.parentNode.removeChild(tr);
        swalWithBootstrapButtons.fire(
          'حذف!',
          'تم حذف الموعد بنجاح',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'ألغاء',
          'لم يتم حذف موعدك',
          'error'
        )
      }
    });
  }

}
