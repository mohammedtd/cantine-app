import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../services/api';
import { ToastService } from '../../services/toast';
import { Reservation as ReservationModel } from '../../models';

@Component({
  selector: 'app-reservation',
  imports: [DatePipe],
  templateUrl: './reservation.html',
  styleUrl: './reservation.css',
})
export class Reservation implements OnInit {

  reservations: ReservationModel[] = [];
  loading = true;
  erreur = '';

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.apiService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.erreur = 'Impossible de charger les réservations.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  annuler(id: string) {
    this.apiService.cancelReservation(id).subscribe({
      next: () => {
        const r = this.reservations.find(r => r._id === id);
        if (r) r.statut = 'annulé';
        this.toastService.success('Réservation annulée');
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastService.error('Impossible d\'annuler la réservation.');
      }
    });
  }
}