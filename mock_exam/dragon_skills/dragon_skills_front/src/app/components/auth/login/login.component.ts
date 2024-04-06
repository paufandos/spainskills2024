import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username?: string;
  password?: string;

  constructor(private authService: AuthService, private router: Router) {}

  logIn() {
    if (this.username && this.password) {
      const user: User = {
        username: this.username,
        password: this.password,
        admin: false,
        points: 0,
        isLogged: false,
      };
      this.authService.logIn(user);
      this.router.navigate(['/']);
    }
  }
}
