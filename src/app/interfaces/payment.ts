export interface Payment {
    id: number
    userId: number
    paymentRequestId: number
    paymentMethodId: number
    amount: number
    status: 'success' | 'failed'
}
