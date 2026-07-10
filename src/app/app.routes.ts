import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/landing/landing').then(m => m.Landing)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: 'accueil',
    loadComponent: () => import('./components/accueil/accueil').then(m => m.Accueil),
    canActivate: [authGuard]
  },
  {
    path: 'menu',
    loadComponent: () => import('./components/menu/menu').then(m => m.Menu),
    canActivate: [authGuard]
  },
  {
    path: 'reservation',
    loadComponent: () => import('./components/reservation/reservation').then(m => m.Reservation),
    canActivate: [authGuard]
  },
  {
    path: 'compte',
    loadComponent: () => import('./components/compte/compte').then(m => m.Compte),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
