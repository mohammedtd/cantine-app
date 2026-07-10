import { Injectable } from '@angular/core';
import { Toast } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];
  private counter = 0;

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = ++this.counter;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.remove(id), 4000);
  }

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  info(message: string) {
    this.show(message, 'info');
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }
}
