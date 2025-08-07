export interface Promotion {
  id: number
  name: string
  discount: number
  membershipId: number
  startDate: Date
  endDate: Date
  membership?: Membership // preload
}
import { Membership } from './membership'