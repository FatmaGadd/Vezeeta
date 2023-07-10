import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService:TokenService) { }
  get isLoggedIn(){
    if (this.tokenService.GetToken()) {
      return true;
    } else {
      return false;
    }
  }
  get isAdmin(){
    if (this.tokenService.GetRole() == "Admin") {
      return true;
    } else {
      return false;
    }
  }
  get isDoctor(){
    if (this.tokenService.GetRole() == "Doctor") {
      return true;
    } else {
      return false;
    }
  }
  get isPatient(){
    if (this.tokenService.GetRole() == "Patient") {
      return true;
    } else {
      return false;
    }
  }
  
}
