import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Si l'utilisateur est déjà connecté, on le redirige directement vers l'accueil/dashboard
    if (this.authService.estConnecte()) {
      this.router.navigate(['/accueil']);
    }
  }
}
