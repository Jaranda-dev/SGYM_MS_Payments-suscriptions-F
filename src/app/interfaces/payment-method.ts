export interface PaymentMethod {
  id: number
  name: string
  description: string
  code: string
  is_active: boolean
  paymentRequests?: PaymentRequest[]
}
import { PaymentRequest } from './payment-request'