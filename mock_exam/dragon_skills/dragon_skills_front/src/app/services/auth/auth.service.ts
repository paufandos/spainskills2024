import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user?: User;

  logIn(user: User) {
    this.user = user;
    if (user.username === 'admin') {
      this.user.admin = true;
    }
    this.user.isLogged = true;
  }

  logOut() {
    if (this.user) {
      this.user = undefined;
    }
  }

  isUserLogged() {
    return this.user?.isLogged ? this.user?.isLogged : false;
  }

  isUserAdmin() {
    return this.user?.admin ? this.user?.admin : false;
  }

  getUserName() {
    return this.user?.username ? this.user?.username : '';
  }
}
