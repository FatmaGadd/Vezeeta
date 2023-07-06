import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  GetToken() {
    return localStorage.getItem('Token');
  }
  GetRole() {
    return localStorage.getItem('Role');
  }
  GetUsername() {
    return localStorage.getItem('Username');
  }
  GetUserId() {
    return localStorage.getItem('UserId');
  }
  SaveToken(id:number,token: string, role: string, username: string) {
    localStorage.setItem('Token', token);
    localStorage.setItem('Role', role);
    localStorage.setItem('Username', username);
    localStorage.setItem('UserId', id.toString());

  }
  ClearToken() {
    localStorage.clear();
  }
}
