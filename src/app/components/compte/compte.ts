import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api';
import { ToastService } from '../../services/toast';
import { CompteInfo } from '../../models';

@Component({
  selector: 'app-compte',
  imports: [FormsModule, DatePipe],
  templateUrl: './compte.html',
  styleUrl: './compte.css',
})
export class Compte implements OnInit {

  eleve: CompteInfo | null = null;
  historique: any[] = [];
  loading = true;
  erreur = '';
  montantRecharge: number = 0;
  rechargeLoading = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.chargerCompte();
  }

  chargerCompte() {
    this.apiService.getCompte().subscribe({
      next: (data) => {
        this.eleve = data;
        this.historique = data.historique || [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erreur = 'Impossible de charger le compte.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  recharger() {
    if (!this.montantRecharge || this.montantRecharge <= 0) {
      this.toastService.error('Veuillez entrer un montant valide.');
      return;
    }
    this.rechargeLoading = true;
    this.apiService.rechargerSolde(this.montantRecharge).subscribe({
      next: (data) => {
        if (this.eleve) this.eleve.solde = data.solde;
        this.toastService.success(`Solde rechargé de ${this.montantRecharge} € avec succès !`);
        this.montantRecharge = 0;
        this.rechargeLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastService.error('Erreur lors de la recharge.');
        this.rechargeLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}