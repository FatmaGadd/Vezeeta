import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterPatientComponent } from './components/register-patient/register-patient.component';


const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'registerPatient', component: RegisterPatientComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
