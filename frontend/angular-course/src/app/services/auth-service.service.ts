import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  isLogged = false;

  logIn() {
    this.isLogged = true;
  }

  logOut() {
    this.isLogged = false
  }

  isAuthenticated(): boolean {
    return this.isLogged;
  }
}
