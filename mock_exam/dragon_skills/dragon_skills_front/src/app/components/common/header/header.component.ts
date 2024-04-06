import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private authService: AuthService) {}

  isUserLogged() {
    return this.authService.isUserLogged();
  }

  isAdmin() {
    return this.authService.isUserAdmin();
  }

  logOut() {
    this.authService.logOut();
  }
}
