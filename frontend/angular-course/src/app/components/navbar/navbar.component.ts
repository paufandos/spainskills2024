import { CommonModule, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, UpperCasePipe, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private authService: AuthServiceService, private router: Router) {}

  isUserLogged(): boolean {
    return this.authService.isAuthenticated();
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['/login'])
  }
}
