import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private items: any[] = [];

  ajouterAuPanier(menu: any) {
    const existe = this.items.find(i => i._id === menu._id);
    if (!existe) {
      this.items.push({ ...menu, quantite: 1 });
    }
  }

  retirerDuPanier(id: string) {
    this.items = this.items.filter(i => i._id !== id);
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce((acc, i) => acc + 3.50 * i.quantite, 0).toFixed(2);
  }

  getNombre() {
    return this.items.length;
  }

  viderPanier() {
    this.items = [];
  }

  estDansPanier(id: string) {
    return this.items.some(i => i._id === id);
  }

}