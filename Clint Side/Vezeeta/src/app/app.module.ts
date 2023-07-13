import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar'
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterPatientComponent } from './components/patient/register-patient/register-patient.component';
import { LoginComponent } from './components/login/login.component';
import { PatientAccountComponent } from './components/Accounts/patient-account/patient-account.component';
import { PatientProfileComponent } from './components/Accounts/patient-profile/patient-profile.component';
import { PatientChangePasswordComponent } from './components/Accounts/patient-change-password/patient-change-password.component';
import { PatientAppointmentComponent } from './components/patient/patient-appointment/patient-appointment.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SearchComponent } from './components/search/search.component';
import { QuestionsComponent } from './components/questions/ask-question/questions.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpecilizationComponent } from './components/questions/specilization/specilization.component';
import { ViewQuestionComponent } from './components/questions/view-question/view-question.component';
import { DialogModule } from 'primeng/dialog';
import { PatientQuestionsComponent } from './components/questions/patient-questions/patient-questions.component';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterPatientComponent,
    LoginComponent,
    PatientAppointmentComponent,
    PatientAccountComponent,
    PatientProfileComponent,
    PatientChangePasswordComponent,
    ErrorComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    SearchComponent,
    QuestionsComponent,
    SpecilizationComponent,
    ViewQuestionComponent,
    PatientQuestionsComponent,
  ],
  imports: [
    PaginatorModule,
    DialogModule,
    SelectButtonModule,
    DropdownModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RadioButtonModule,
    FormsModule,
    ToastModule,
    TableModule,
    NgProgressModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    ProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
