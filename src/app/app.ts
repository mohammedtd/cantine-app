import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth';
import { ToastService } from './services/toast';
import { ToastComponent } from './components/toast/toast';
import { Utilisateur } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, ToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  heure: string = '';
  date: string = '';
  estConnecte = false;
  utilisateur: Utilisateur | null = null;
  currentUrl = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 1000);
    this.refreshAuth();

    // Met à jour l'état à chaque changement de route
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.currentUrl = e.url;
      this.refreshAuth();
    });
  }

  refreshAuth() {
    this.estConnecte = this.authService.estConnecte();
    this.utilisateur = this.authService.getUtilisateur();
  }

  updateTime() {
    const now = new Date();
    this.heure = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    this.date = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  }

  get showNavbar(): boolean {
    return this.estConnecte && this.currentUrl !== '/accueil' && this.currentUrl !== '/' && this.currentUrl !== '';
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  seDeconnecter() {
    this.authService.deconnexion();
    this.estConnecte = false;
    this.utilisateur = null;
    this.router.navigate(['/login']);
  }

  isActive(route: string): boolean {
    return this.currentUrl === `/${route}`;
  }
}