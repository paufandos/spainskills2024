import { Routes } from '@angular/router';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { GamesComponent } from './components/games/games.component';
import { TablesComponent } from './components/tables/tables.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { HomeComponent } from './components/common/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { loggedGuard } from './guard/logged.guard';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservations', component: ReservationsComponent, canActivate: [loggedGuard] },
  { path: 'games', component: GamesComponent, canActivate: [loggedGuard, adminGuard] },
  { path: 'tables', component: TablesComponent, canActivate: [loggedGuard, adminGuard] },
  { path: '**', component: NotFoundComponent },
];
