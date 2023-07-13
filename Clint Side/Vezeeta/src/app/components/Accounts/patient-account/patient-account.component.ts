import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';
import { PatientProfileComponent } from '../patient-profile/patient-profile.component';
import { IsActiveMatchOptions } from '@angular/router';

interface CustomIsActiveMatchOptions extends IsActiveMatchOptions {
  exact?: boolean;
  class?: string;

}

@Component({
  selector: 'app-patient-account',
  templateUrl: './patient-account.component.html',
  styleUrls: ['./patient-account.component.css']
})
export class PatientAccountComponent  { 
// constructor(private patientService:PatientService) {}

public routerLinkActiveOptions: CustomIsActiveMatchOptions = {
  exact: true, class: 'joinNow',
  matrixParams: 'exact',
  queryParams: 'exact',
  paths: 'exact',
  fragment: 'exact'
}
}