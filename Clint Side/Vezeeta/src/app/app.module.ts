import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgProgressModule } from 'ngx-progressbar'
import { AuthInterceptor } from './Interceptor/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PatientAppointmentComponent } from './components/patient/patient-appointment/patient-appointment.component';
import { ErrorComponent } from './components/error/error.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { QuestionsComponent } from './components/questions/ask-question/questions.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpecilizationComponent } from './components/questions/specilization/specilization.component';
import { ViewQuestionComponent } from './components/questions/view-question/view-question.component';
import { DialogModule } from 'primeng/dialog';
import { PatientQuestionsComponent } from './components/questions/patient-questions/patient-questions.component';
import { PaginatorModule } from 'primeng/paginator';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SearchTopBarComponent } from './components/search-page/components/search-top-bar/search-top-bar.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/home/Components/search/search.component';
import { DoctorsListComponent } from './components/search-page/components/doctors-list/doctors-list.component';
import { SideMenueComponent } from './components/search-page/components/side-menue/side-menue.component';
import { ClinicComponent } from './components/clinic/clinic.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { DoctorProfileComponent } from './components/doctor-profile/doctor-profile.component';
import { LoginDoctorComponent } from './components/login/login-doctor/login-doctor.component';
import { LoginAdminComponent } from './components/login/login-admin/login-admin.component';
import { CarouselModule } from 'primeng/carousel';
import { ScrollerModule } from 'primeng/scroller';
import { TimeTableComponent } from './components/search-page/components/doctors-list/components/time-table/time-table.component';
import { ConfirmCodeComponent } from './components/confirm-code/confirm-code.component';
import { ChangePasswordComponent } from './components/Doctor/change-password/change-password.component';
import { DoctorDataComponent } from './components/Doctor/doctor-data/doctor-data.component';
import { TakeAppoinmentComponent } from './components/patientappoinment/take-appoinment/take-appoinment.component';
import { SavedAppoinmentComponent } from './components/patientappoinment/saved-appoinment/saved-appoinment.component';
import { DoctorAddAppointmentComponent } from './components/Doctor/doctor-add-appointment/doctor-add-appointment.component';
import { ListboxModule } from 'primeng/listbox';
import { ListComponent } from './components/search-page/components/doctors-list/components/time-table/list/list.component';
import { QlistComponent } from './components/search-page/components/qlist/qlist.component';
import { FieldsetModule } from 'primeng/fieldset';
import { TestComponent } from './components/test/test.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { TabViewModule } from 'primeng/tabview';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { CardComponent } from './components/admin-page/Components/card/card.component';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { UsersComponent } from './components/admin-page/Components/users/users.component';
import { BadgeModule } from 'primeng/badge';
import { AddspecialComponent } from './components/admin-page/Components/addspecial/addspecial.component';
import { AddreigonComponent } from './components/admin-page/Components/addreigon/addreigon.component';
import { AddcityComponent } from './components/admin-page/Components/addcity/addcity.component';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RegisterPatientComponent,
    LoginComponent,
    PatientAccountComponent,
    PatientAppointmentComponent,
    PatientQuestionsComponent,
    ErrorComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    QuestionsComponent,
    SpecilizationComponent,
    ViewQuestionComponent,
    SearchComponent,
    SearchPageComponent,
    SearchTopBarComponent,
    HomeComponent,
    DoctorsListComponent,
    SideMenueComponent,
    ClinicComponent,
    DoctorProfileComponent,
    DoctorRegisterComponent,
    LoginDoctorComponent,
    LoginAdminComponent,
    TimeTableComponent,
    ConfirmCodeComponent,
    ChangePasswordComponent,
    DoctorDataComponent,
    TakeAppoinmentComponent,
    SavedAppoinmentComponent,
    DoctorAddAppointmentComponent,
    ListComponent,
    QlistComponent,
    TestComponent,
    AdminPageComponent,
    CardComponent,
    UsersComponent,
    AddspecialComponent,
    AddreigonComponent,
    AddcityComponent,
    ContactComponent,

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
    CarouselModule,
    ScrollerModule,
    ListboxModule,
    FieldsetModule,
    DataViewModule,
    TabViewModule,
    ButtonModule
    , ImageModule
    , OverlayPanelModule,
    ToastModule
    , BadgeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
