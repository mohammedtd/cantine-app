import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { AuthService } from '../../services/auth';
import { ToastService } from '../../services/toast';
import { Router, RouterLink } from '@angular/router';
import { Utilisateur } from '../../models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  utilisateur: Utilisateur | null = null;
  loading = false;
  saving = false;
  erreur = '';

  form = {
    nom: '',
    email: '',
    classe: ''
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.utilisateur = this.authService.getUtilisateur();
    
    if (this.utilisateur) {
      this.form.nom = this.utilisateur.nom;
      this.form.email = this.utilisateur.email;
      this.form.classe = this.utilisateur.classe;
    }
    this.loading = false;
  }

  enregistrer() {
    this.erreur = '';
    
    if (!this.form.nom || !this.form.email || !this.form.classe) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    this.saving = true;
    this.cdr.detectChanges();

    this.apiService.updateCompte(this.form).subscribe({
      next: (user: Utilisateur) => {
        this.saving = false;
        this.authService.updateUtilisateurLocal(user);
        this.toastService.success('Profil mis à jour avec succès !');
        // Redirige vers l'accueil pour rafraîchir l'affichage du menu/navbar
        this.router.navigate(['/accueil']);
      },
      error: (err) => {
        this.saving = false;
        this.erreur = err.error?.message || 'Erreur lors de la mise à jour.';
        this.toastService.error(this.erreur);
        this.cdr.detectChanges();
      }
    });
  }
}
