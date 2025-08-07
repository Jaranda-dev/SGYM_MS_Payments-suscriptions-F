export interface PaymentRequest {
  id: number
  userId: number
  paymentMethodId: number
  externalReference?: string
  amount: string
  currency: string
  status: 'pending' | 'processing' | 'success' | 'failed' | 'canceled' | 'refunded' | 'expired'
  description?: string
  metadata?: string
  createdAt: string
  updatedAt: string
  paymentMethod?: PaymentMethod
  payments?: Payment[]
}
import { PaymentMethod } from './payment-method'
import { Payment } from './payment'