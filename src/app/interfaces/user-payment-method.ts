export interface UserPaymentMethod {
  id: number
  userId: number
  customerId: string
  paymentMethodId: string
  brand: string
  last4: string
  expMonth: string // '01' - '12'
  expYear: number
  isDefault: boolean
  createdAt: string
  updatedAt: string
}
