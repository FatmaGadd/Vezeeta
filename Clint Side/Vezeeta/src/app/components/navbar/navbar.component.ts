import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPatientAdd } from 'src/app/Interfaces/ipatient-add';
import { PatientService } from 'src/app/Services/Entity_Services/patient.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  name:any="";
  isLogin='userLogOut';
  // isLogin=localStorage.getItem('isLogin');
  constructor(private patientService:PatientService) {
    
  }
  ngOnInit(): void {
    if(localStorage.getItem("UserName"))
                this.name=localStorage.getItem("UserName")?.toString();
                if(localStorage.getItem('isLogin') != null)
                          this.isLogin=String(localStorage.getItem('isLogin'));
                          
  }
  DocRole(){
     localStorage.setItem('State','Doctor')
    }
  patientRole(){ localStorage.setItem('State','Patient')}
  logOut(){
    localStorage.removeItem('Role');
    localStorage.removeItem('Token');
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserId');
    this.isLogin='userLogOut';
    
  }  

}
