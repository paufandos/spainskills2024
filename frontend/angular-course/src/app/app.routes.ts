import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard]},
  { path: 'home', component: HomeComponent , canActivate: [authGuard]},
  { path: 'products', component: ProductListComponent , canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];
