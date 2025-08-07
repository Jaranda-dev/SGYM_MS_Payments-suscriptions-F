export interface Subscription {
    id: number
    userId: number
    membershipId: number
    startDate: Date
    endDate: Date
    status: 'active' | 'cancelled' | 'expired'
}

