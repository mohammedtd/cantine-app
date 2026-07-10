export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  classe: string;
  solde: number;
  role: 'eleve' | 'admin';
}

export interface Menu {
  _id: string;
  jour: string;
  plat: string;
  dessert: string;
  description: string;
  image: string;
  prix?: number;
}

export interface Reservation {
  _id: string;
  menuId: Menu;
  utilisateurId: string;
  date: string;
  statut: 'confirmé' | 'annulé';
}

export interface CompteInfo {
  nom: string;
  classe: string;
  solde: number;
  historique: Reservation[];
}

export interface AuthResponse {
  token: string;
  utilisateur: Utilisateur;
}

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
