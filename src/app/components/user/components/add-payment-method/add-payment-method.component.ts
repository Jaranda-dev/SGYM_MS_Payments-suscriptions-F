import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeService } from '../../../../services/stripe.service';
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { PaymentGatewayService } from '../../../../services/payment-gateway.service';
import { UserPaymentMethodService } from '../../../../services/user-payment-method/user-payment-method.service';
import { MessageToastComponent } from '../../../resources/message-toast/message-toast.component';

@Component({
  selector: 'app-add-payment-method',
  imports: [CommonModule, MessageToastComponent],
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css']
})
export class AddPaymentMethodComponent implements OnInit {
  @ViewChild('cardElement', { static: true }) cardElement!: ElementRef;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;

  clientSecret: string | null = null;

  loading = false;
  errorMessage = '';
  successMessage = '';

  @Output() addOnSuccess = new EventEmitter<number>();
  @Output() addOnFailure = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private stripeService: StripeService,
    private paymentGatewayService: PaymentGatewayService,
    private userPaymentMethodService: UserPaymentMethodService
  ) {}

  async ngOnInit() {
    console.log('[INIT] Componente iniciado');
    await this.initializeStripe();
  }

  async initializeStripe() {
    try {
      console.log('[STRIPE] Inicializando Stripe...');
      this.stripe = await this.stripeService.getStripe();

      if (!this.stripe) {
        this.errorMessage = 'Stripe no está disponible';
        console.error('[STRIPE] Stripe no disponible');
        return;
      }

      this.elements = this.stripe.elements();
      this.card = await this.stripeService.createCardElement(this.elements);
      this.card.mount(this.cardElement.nativeElement);

      console.log('[STRIPE] Elemento de tarjeta montado');

      this.card.on('change', (event) => {
        if (event.error) {
          this.errorMessage = event.error.message || 'Error en los datos de la tarjeta';
          console.warn('[STRIPE] Error en tarjeta:', this.errorMessage);
        } else {
          this.errorMessage = '';
        }
      });

      console.log('[STRIPE] Solicitando Setup Intent...');
      this.paymentGatewayService.setupIntent().subscribe({
        next: (response) => {
          this.clientSecret = response.data.client_secret;
          console.log('[STRIPE] Setup Intent recibido:', response);
        },
        error: (error) => {
          console.error('[STRIPE] Error al crear Setup Intent:', error);
          this.errorMessage = 'Error al crear Setup Intent';
        }
      });
    } catch (error) {
      console.error('[STRIPE] Error al inicializar Stripe:', error);
      this.errorMessage = 'Error al inicializar Stripe';
    }
  }

  async addPaymentMethod() {
    if (!this.stripe || !this.card || !this.clientSecret) {
      this.errorMessage = 'Stripe no está listo o falta información';
      console.warn('[PAGO] Stripe/Card/clientSecret no disponibles');
      this.onFailure(this.errorMessage);
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('[PAGO] Iniciando confirmación del método de pago...');
    try {
      const { setupIntent, error } = await this.stripe.confirmCardSetup(this.clientSecret, {
        payment_method: {
          card: this.card,
        },
      });

      if (error) {
        this.errorMessage = error.message || 'Error al agregar el método de pago';
        console.error('[PAGO] Error confirmando método de pago:', error);
        this.onFailure(this.errorMessage);
      } else if (setupIntent) {
        console.log('[PAGO] SetupIntent confirmado:', setupIntent);
        // Enviar el payment method al backend
        this.createPaymentMethod(setupIntent.payment_method as string);
      }
    } catch (error) {
      console.error('[PAGO] Error inesperado:', error);
      this.errorMessage = 'Error inesperado al agregar el método de pago';
      this.onFailure(this.errorMessage);
    } finally {
      this.loading = false;
    }
  }

  createPaymentMethod(paymentMethodId: string) {
    if (!paymentMethodId) {
      this.errorMessage = 'ID del método de pago no válido';
      console.warn('[PAGO] paymentMethodId no disponible');
      this.onFailure(this.errorMessage);
      return;
    }

    console.log('[PAGO] Enviando método a backend...');
    this.userPaymentMethodService.createbypaymentMethod(paymentMethodId).subscribe({
      next: (response) => {
        console.log('[PAGO] Método registrado exitosamente:', response);
        this.successMessage = 'Método de pago agregado exitosamente';
        this.onSuccess(response.id);
      },
      error: (error) => {
        console.error('[PAGO] Error al registrar el método de pago:', error);
        this.errorMessage = 'Error al registrar el método de pago en el sistema';
        this.onFailure(this.errorMessage);
      }
    });
  }

  clearCard() {
    if (this.card) {
      this.card.clear();
      console.log('[CARD] Tarjeta limpiada');
    }
    this.errorMessage = '';
    this.successMessage = '';
    // Reinicializar Stripe para obtener un nuevo clientSecret
    this.initializeStripe();
  }

  onSuccess(id : number) {
   this.successMessage = 'Método de pago agregado exitosamente';
    this.addOnSuccess.emit(id);

    setTimeout(() => {
      this.clearCard();
      this.closeModal.emit();
    }, 1500);
  }

  onFailure(message: string) {
    this.errorMessage = message;
    console.log('[ERROR] Error:', message);
    this.addOnFailure.emit(message);
    // Mantener el modal abierto para que el usuario pueda intentar de nuevo
  }

  close() {
    this.clearCard();
    this.closeModal.emit();
  }
}
