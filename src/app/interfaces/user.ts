export interface User {
  id: number
  roleId: number
  email: string
  uuid: string
  is_active: boolean
  last_access?: string | null
  profile?: Profile
  role?: Role
  subscriptions?: Subscription[]
  userPromotions?: UserPromotion[]
  userPaymentMethods?: UserPaymentMethod[]
}

import { Role } from './role'
import { Subscription } from './subscription'
import { UserPromotion } from './user-promotion'
import { UserPaymentMethod } from './user-payment-method'

export interface Profile {
  id: number
  userId: number
  fullName: string
  phone?: string
  birthDate: string
  gender: 'M' | 'F' | 'Other'
  photoUrl?: string
  address?: UserAddress
}

export interface UserAddress {
  id: number
  profileId: number
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}
