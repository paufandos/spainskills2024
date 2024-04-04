import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user ?: string;
  password ?: string;

  constructor(private router: Router, private authService: AuthServiceService) {}

  logIn() {
    if (!!this.user || !!this.password) return;
    this.authService.logIn();
    this.router.navigate(['/home']);
  }
}
