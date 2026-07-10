import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api';
import { PanierService } from '../../services/panier';
import { ToastService } from '../../services/toast';
import { Menu as MenuModel } from '../../models';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnInit {

  menus: MenuModel[] = [];
  loading = true;
  error = '';
  erreurPaiement = '';
  menuSelectionne: MenuModel | null = null;
  showPopup = false;
  showPaiement = false;
  showPanier = false;
  modePaiement: string = '';
  paiementConfirme = false;
  paiementLoading = false;

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    public panierService: PanierService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.apiService.getMenus().subscribe({
      next: (menus) => {
        this.menus = menus;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Impossible de charger les menus.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  ouvrirPopup(menu: MenuModel) {
    this.menuSelectionne = menu;
    this.showPopup = true;
    this.showPaiement = false;
    this.showPanier = false;
    this.modePaiement = '';
    this.paiementConfirme = false;
    this.erreurPaiement = '';
  }

  fermerPopup() {
    this.showPopup = false;
    this.menuSelectionne = null;
    this.showPanier = false;
    this.showPaiement = false;
    this.paiementConfirme = false;
    this.erreurPaiement = '';
  }

  ajouterAuPanier() {
    if (this.menuSelectionne) {
      this.panierService.ajouterAuPanier(this.menuSelectionne);
      this.toastService.success(`"${this.menuSelectionne.plat}" ajouté au panier`);
      this.fermerPopup();
    }
  }

  ouvrirPanier() {
    this.showPanier = true;
    this.showPopup = true;
    this.menuSelectionne = null;
    this.showPaiement = false;
    this.paiementConfirme = false;
    this.erreurPaiement = '';
  }

  passerAuPaiement() {
    if (this.menuSelectionne && !this.panierService.estDansPanier(this.menuSelectionne._id)) {
      this.panierService.ajouterAuPanier(this.menuSelectionne);
    }
    this.showPaiement = true;
    this.erreurPaiement = '';
  }

  choisirModePaiement(mode: string) {
    this.modePaiement = mode;
  }

  confirmerPaiement() {
    const items = this.panierService.getItems();
    const total = items.length * 3.50;
    this.paiementLoading = true;
    this.erreurPaiement = '';

    this.apiService.payerRepas(total).subscribe({
      next: () => {
        items.forEach(item => {
          this.apiService.createReservation({ menuId: item._id }).subscribe();
        });
        this.paiementConfirme = true;
        this.paiementLoading = false;
        this.panierService.viderPanier();
        this.toastService.success('Paiement confirmé ! Bon appétit 🍽️');
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.paiementLoading = false;
        const msg = err.error?.message || 'Erreur lors du paiement';
        
        if (msg === 'Solde insuffisant') {
          this.erreurPaiement = "Vous n'avez pas de solde suffisant pour effectuer ce paiement.";
        } else {
          this.erreurPaiement = msg;
        }

        this.toastService.error(this.erreurPaiement);
        this.cdr.detectChanges();
      }
    });
  }
}