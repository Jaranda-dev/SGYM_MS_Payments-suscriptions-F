import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { MembershipComponent } from './components/membership/membership.component'
import { PaymentMethodComponent } from './components/payment-method/payment-method.component'
import { PaymentComponent } from './components/payment/payment.component'
import { PromotionComponent } from './components/promotion/promotion.component'
import { SubscriptionComponent } from './components/subscription/subscription.component'
import { MembershipCreateComponent } from './components/membership/membership-create/membership-create.component'


export const routes: Routes = [

  { path: 'membership/create', component: MembershipCreateComponent },
  { path: 'membership', component: MembershipComponent },
  { path: 'payment_method', component: PaymentMethodComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'subscription', component: SubscriptionComponent },
  { path: '', redirectTo: '/membership', pathMatch: 'full' },
  { path: '**', redirectTo: '/membership' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

