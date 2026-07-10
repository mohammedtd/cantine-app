import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, Utilisateur } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://cantine-backend.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  inscription(data: { nom: string; email: string; motDePasse: string; classe: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, data).pipe(
      tap((res) => this.sauvegarderSession(res))
    );
  }

  connexion(data: { email: string; motDePasse: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data).pipe(
      tap((res) => this.sauvegarderSession(res))
    );
  }

  sauvegarderSession(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('utilisateur', JSON.stringify(res.utilisateur));
  }

  deconnexion() {
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateur');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUtilisateur(): Utilisateur | null {
    const u = localStorage.getItem('utilisateur');
    return u ? JSON.parse(u) : null;
  }

  estConnecte(): boolean {
    return !!this.getToken();
  }
}