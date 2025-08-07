import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../../services/subscription/subscription.service';
import { Subscription } from '../../../../interfaces/subscription';
import { CommonModule } from '@angular/common';
import { MessageToastComponent } from '../../../resources/message-toast/message-toast.component';

@Component({
  selector: 'app-subscription-history',
  imports: [CommonModule, MessageToastComponent],
  templateUrl: './subscription-history.component.html',
  styleUrl: './subscription-history.component.css'
})
export class SubscriptionHistoryComponent {
  subscriptions: Subscription[] = [];
  errorMessage = '';
  successMessage = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSubscriptionHistory();
  }

  loadSubscriptionHistory() {
    this.subscriptionService.getByUser().subscribe({
      next: (subscriptions) => {
        console.log('User subscriptions:', subscriptions);
        this.subscriptions = subscriptions;
      },
      error: (error) => {
        console.error('Error loading subscription history:', error);
        this.onFailure('Error al cargar el historial de suscripciones');
      }
    });
  }

  hasActiveSubscription(): boolean {
    return this.subscriptions.some(sub => sub.status === 'active');
  }

  handleSubscriptionAction() {
    if (this.hasActiveSubscription()) {
      // Si tiene suscripción activa, ir a cambiar suscripción
      this.router.navigate(['/user/change-subscription']);
    } else {
      // Si no tiene suscripción activa, ir a suscribirse
      this.router.navigate(['/user/subscribe']);
    }
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'active': 'Activa',
      'expired': 'Expirada',
      'cancelled': 'Cancelada'
    };
    return statusMap[status] || status;
  }

  onSuccess(message: string) {
    console.log('Success:', message);
    this.successMessage = message;
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  onFailure(message: string) {
    console.log('Failure:', message);
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ''), 3000);
  }
}
