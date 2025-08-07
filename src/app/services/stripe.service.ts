import { Injectable } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StripeService  {
  private stripePromise: Promise<Stripe | null>;

  constructor() {
    this.stripePromise = loadStripe(environment.STRIPE_PUBLIC_KEY);
  }

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }

  async createCardElement(elements: StripeElements): Promise<StripeCardElement> {
    return elements.create('card', {
      style: {
        base: {
          fontSize: '16px',
          color: '#424770',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
      },
    });
  }
}