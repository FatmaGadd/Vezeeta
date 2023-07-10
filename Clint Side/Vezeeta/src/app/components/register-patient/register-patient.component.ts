import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent {

constructor(private router: Router) {}
goToLogin() {
  this.router.navigate(['/login']);
}
}