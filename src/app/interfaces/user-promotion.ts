export interface UserPromotion {
  id: number
  promotionId: number
  userId: number
  appliedAt: string
  expiredAt: string
  promotion?: Promotion
}
import { Promotion } from './promotion'