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

  mode: 'connexion' | 'inscription' | 'oublie' | 'reinitialiser' = 'connexion';
  loading = false;
  erreur = '';
  succes = '';

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

  formOublie = {
    email: ''
  };

  formReinit = {
    token: '',
    nouveauMotDePasse: '',
    confirmation: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    const requestedMode = this.route.snapshot.queryParams['mode'];

    if (token) {
      this.mode = 'reinitialiser';
      this.formReinit.token = token;
      return;
    }

    if (this.authService.estConnecte()) {
      this.router.navigate(['/accueil']);
      return;
    }

    if (requestedMode === 'connexion' || requestedMode === 'inscription') {
      this.mode = requestedMode;
    } else if (requestedMode === 'oublie') {
      this.mode = 'oublie';
    }
  }

  seConnecter() {
    this.erreur = '';
    this.succes = '';
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
    this.succes = '';
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

  demanderReinit() {
    this.erreur = '';
    this.succes = '';

    if (!this.formOublie.email) {
      this.erreur = 'Veuillez saisir votre adresse email.';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.authService.motDePasseOublie(this.formOublie.email).subscribe({
      next: (res) => {
        this.loading = false;
        this.succes = res.message;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.erreur = err.error?.message || 'Une erreur est survenue. Réessayez.';
        this.cdr.detectChanges();
      }
    });
  }

  reinitialiserMotDePasse() {
    this.erreur = '';
    this.succes = '';

    if (!this.formReinit.nouveauMotDePasse) {
      this.erreur = 'Veuillez saisir un nouveau mot de passe.';
      return;
    }
    if (this.formReinit.nouveauMotDePasse.length < 6) {
      this.erreur = 'Le mot de passe doit contenir au moins 6 caractères.';
      return;
    }
    if (this.formReinit.nouveauMotDePasse !== this.formReinit.confirmation) {
      this.erreur = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();

    this.authService.reinitialiserMotDePasse(this.formReinit.token, this.formReinit.nouveauMotDePasse).subscribe({
      next: (res) => {
        this.loading = false;
        this.succes = res.message;
        setTimeout(() => {
          this.mode = 'connexion';
          this.succes = '';
          this.formReinit = { token: '', nouveauMotDePasse: '', confirmation: '' };
          this.cdr.detectChanges();
        }, 2500);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.erreur = err.error?.message || 'Lien invalide ou expiré.';
        this.cdr.detectChanges();
      }
    });
  }

  changerMode(m: 'connexion' | 'inscription' | 'oublie') {
    this.mode = m;
    this.erreur = '';
    this.succes = '';
  }
}