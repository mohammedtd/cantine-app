import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu, Reservation, CompteInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // menus
  getMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.baseUrl}/menus`);
  }

  // réservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/reservations`);
  }

  createReservation(reservation: { menuId: string }): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseUrl}/reservations`, reservation);
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/reservations/${id}`, {});
  }

  // compte
  getCompte(): Observable<CompteInfo> {
    return this.http.get<CompteInfo>(`${this.baseUrl}/compte`);
  }

  rechargerSolde(montant: number): Observable<{ solde: number }> {
    return this.http.post<{ solde: number }>(`${this.baseUrl}/compte/recharger`, { montant });
  }

  payerRepas(montant: number): Observable<{ solde: number }> {
    return this.http.post<{ solde: number }>(`${this.baseUrl}/compte/paiement`, { montant });
  }
}