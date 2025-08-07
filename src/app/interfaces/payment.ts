export interface Payment {
  id: number
  paymentRequestId: number
  subscriptionId: number
  amount: string
  paymentDate: string
  concept?: string
  status: 'pending' | 'processing' | 'success' | 'failed' | 'canceled'
  createdAt: string
  subscription?: Subscription
  paymentRequest?: PaymentRequest
}
import { Subscription } from './subscription'
import { PaymentRequest } from './payment-request'
