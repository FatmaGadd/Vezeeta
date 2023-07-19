import { Component, Input, OnInit } from '@angular/core';
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
  // isLogin='userLogOut';
  
isLogin = false;
 role=localStorage.getItem('Role');
  constructor(private patientService:PatientService) {}

  ngOnInit(): void {
    if(localStorage.getItem("UserName"))
                this.name=localStorage.getItem("UserName")?.toString();
                if(localStorage.getItem('UserId') != null)
                          this.isLogin=true;
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
    localStorage.removeItem('State');
    localStorage.removeItem('id');
    this.isLogin=false;
    
  }  

}
