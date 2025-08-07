export interface Membership {
  id: number
  name: string
  durationDays: number
  price: number
  promotions?: Promotion[] // relación: 1 a muchos
  subscriptions?: Subscription[] // opcional, por preload inverso
}

import { Promotion } from './promotion'
import { Subscription } from './subscription'