import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterPatientComponent } from './components/patient/register-patient/register-patient.component';
import { PatientProfileComponent } from './components/Accounts/patient-profile/patient-profile.component';
import { PatientChangePasswordComponent } from './components/Accounts/patient-change-password/patient-change-password.component';
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


const routes: Routes = [
  {path:'',component:HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registerPatient', component: RegisterPatientComponent },
  {path:'account/profile' , component:PatientProfileComponent},
  {path:'account/changePassword' , component:PatientChangePasswordComponent},
  {path:'account' ,component:PatientAccountComponent },
  {path:'patientAppoint' , component:PatientAppointmentComponent},
  {path:'forgetPass' , component:ForgetPasswordComponent},
  {path:'questions/view/:id',component:ViewQuestionComponent},
  {path:'questions/specializations',component:SpecilizationComponent},
  {path:'questions/ask',component:QuestionsComponent},
  {path:'questions/patient',component:PatientQuestionsComponent},
  { path: 'updateClinic/:id', component: ClinicComponent },
  { path: 'search', component: SearchPageComponent },
  {path:'**',  component:ErrorComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
