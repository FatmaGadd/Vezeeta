import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterPatientComponent } from './components/patient/register-patient/register-patient.component';
import { PatientAccountComponent } from './components/Accounts/patient-account/patient-account.component';
import { PatientAppointmentComponent } from './components/patient/patient-appointment/patient-appointment.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ViewQuestionComponent } from './components/questions/view-question/view-question.component';
import { SpecilizationComponent } from './components/questions/specilization/specilization.component';
import { QuestionsComponent } from './components/questions/ask-question/questions.component';
import { PatientQuestionsComponent } from './components/questions/patient-questions/patient-questions.component';
import { HomeComponent } from './components/home/home.component';
import { ClinicComponent } from './components/clinic/clinic.component';
import { SearchComponent } from './components/home/Components/search/search.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { LoginAdminComponent } from './components/login/login-admin/login-admin.component';
import { LoginDoctorComponent } from './components/login/login-doctor/login-doctor.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { ChangePasswordComponent } from './components/Doctor/change-password/change-password.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { DoctorDataComponent } from './components/Doctor/doctor-data/doctor-data.component';
import { TakeAppoinmentComponent } from './components/patientappoinment/take-appoinment/take-appoinment.component';
import { DoctorAddAppointmentComponent } from './components/Doctor/doctor-add-appointment/doctor-add-appointment.component';
import { SavedAppoinmentComponent } from './components/patientappoinment/saved-appoinment/saved-appoinment.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { DoctorReviewComponent } from './components/doctor-review/doctor-review.component';
import { adminGaurd } from './Guards/admin.guard';
import { patientGaurd } from './Guards/patient.guard';
import { doctorGaurd } from './Guards/doctor.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Admin', component: AdminPageComponent,canActivate:[adminGaurd] },

  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: LoginAdminComponent },
  { path: 'login/doctor', component: LoginDoctorComponent },
  { path: 'register/doctor', component: DoctorRegisterComponent },
  { path: 'registerPatient', component: RegisterPatientComponent },
  { path: 'account', component: PatientAccountComponent },
  { path: 'patientAppoint', component: PatientAppointmentComponent,canActivate:[patientGaurd] },
  { path: 'forgetPass', component: ForgetPasswordComponent},
  { path: 'questions/view/:id', component: ViewQuestionComponent },
  { path: 'questions/specializations', component: SpecilizationComponent },
  { path: 'questions/ask', component: QuestionsComponent,canActivate:[patientGaurd] },
  { path: 'questions/patient', component: PatientQuestionsComponent,canActivate:[patientGaurd] },
  { path: 'updateClinic/:id', component: ClinicComponent,canActivate:[doctorGaurd] },
  { path: 'search', component: SearchPageComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'confirmCode', component: ConfirmCodeComponent },
  { path: 'doctor/changePassword', component: ChangePasswordComponent,canActivate:[doctorGaurd] },
  { path: 'doctor/profile', component: DoctorProfileComponent,canActivate:[doctorGaurd] },
  { path: 'doctor/data/:id', component: DoctorDataComponent },
  { path: 'reservation/create/:id/:drid', component: TakeAppoinmentComponent,canActivate:[patientGaurd] },
  { path: 'doctor/add-appointment', component: DoctorAddAppointmentComponent,canActivate:[doctorGaurd] },
  { path: 'book/:id/:drid', component: SavedAppoinmentComponent,canActivate:[patientGaurd] },
  {path:'contactUs', component:ContactComponent},
  {path:'reviews/:id', component:DoctorReviewComponent,canActivate:[patientGaurd]},
  { path: '**', component: ErrorComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
