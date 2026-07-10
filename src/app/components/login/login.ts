import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  mode: 'connexion' | 'inscription' = 'connexion';
  loading = false;
  erreur = '';

  formConnexion = {
    email: '',
    motDePasse: ''
  };

  formInscription = {
    nom: '',
    email: '',
    motDePasse: '',
    classe: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const requestedMode = this.route.snapshot.queryParams['mode'];
    if (requestedMode === 'connexion' || requestedMode === 'inscription') {
      this.mode = requestedMode;
    }
  }

  seConnecter() {
    this.erreur = '';
    this.loading = false;

    if (!this.formConnexion.email || !this.formConnexion.motDePasse) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.authService.connexion(this.formConnexion).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/accueil']);
      },
      error: (err) => {
        this.loading = false;
        this.erreur = err.error?.message || 'Email ou mot de passe incorrect.';
        this.cdr.detectChanges();
      }
    });
  }

  sInscrire() {
    this.erreur = '';
    this.loading = false;

    if (!this.formInscription.nom) {
      this.erreur = 'Le nom est obligatoire.';
      return;
    }
    if (!this.formInscription.email) {
      this.erreur = 'L\'email est obligatoire.';
      return;
    }
    if (!this.formInscription.motDePasse) {
      this.erreur = 'Le mot de passe est obligatoire.';
      return;
    }
    if (this.formInscription.motDePasse.length < 6) {
      this.erreur = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }
    if (!this.formInscription.classe) {
      this.erreur = 'La classe est obligatoire.';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.authService.inscription(this.formInscription).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/accueil']);
      },
      error: (err) => {
        this.loading = false;
        this.erreur = err.error?.message || 'Erreur lors de l\'inscription.';
        this.cdr.detectChanges();
      }
    });
  }

}