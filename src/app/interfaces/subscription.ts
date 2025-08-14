export interface Subscription {
  id: number
  userId: number
  membershipId: number
  startDate: string
  endDate: string
  status: 'active' | 'cancelled' | 'expired'
  isRenewable?: boolean
  canceledAt?: string | null
  membership?: Membership
  payments?: Payment[]
  user?: User
}
import { Membership } from './membership'
import { Payment } from './payment'
import { User } from './user'