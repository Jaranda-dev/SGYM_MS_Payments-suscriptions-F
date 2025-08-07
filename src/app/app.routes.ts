import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MembershipComponent } from './components/membership/membership.component'
import { PaymentMethodComponent } from './components/payment-method/payment-method.component'
import { PaymentComponent } from './components/payment/payment.component'
import { PromotionComponent } from './components/promotion/promotion.component'
import { SubscriptionComponent } from './components/subscription/subscription.component'
import { MembershipCreateComponent } from './components/membership/membership-create/membership-create.component'
import { AddPaymentMethodComponent } from './components/user/components/add-payment-method/add-payment-method.component'
import { PaymentHistoryComponent } from './components/user/components/payment-history/payment-history.component'
import { MembershipListComponent } from './components/user/components/membership-list/membership-list.component'
import { PaymentMethodListComponent } from './components/user/components/payment-method-list/payment-method-list.component'
import { SubscriptionHistoryComponent } from './components/user/components/subscription-history/subscription-history.component'



export const routes: Routes = [

  { path: 'membership/create', component: MembershipCreateComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'payment_method', component: PaymentMethodComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: 'add-payment-method', component: AddPaymentMethodComponent },
  { path: 'payment-history', component: PaymentHistoryComponent },
  { path: 'membership-list', component: MembershipListComponent },
  { path: 'payment-method-list', component: PaymentMethodListComponent },
  { path: 'subscription-history', component: SubscriptionHistoryComponent },
  { path: '', redirectTo: '/membership', pathMatch: 'full' },
  { path: '**', redirectTo: '/membership' }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

