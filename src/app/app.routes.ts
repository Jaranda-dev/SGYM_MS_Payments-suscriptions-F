import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { FederationLoginComponent } from './components/main/federation-login/federation-login.component'
import { DashboardComponent } from './components/user/pages/dashboard/dashboard.component'
import { MainComponent } from './components/main/main/main.component'
import { DashboardAdminComponent } from './components/main/dashboard-admin/dashboard-admin.component'
import { MembershipComponent } from './components/membership/membership.component'
import { PromotionComponent } from './components/promotion/promotion.component'

import { SubscriptionComponent } from './components/subscription/subscription.component'
import { PaymentComponent } from './components/payment/payment.component'
import { PaymentMethodComponent } from './components/payment-method/payment-method.component'
import { ManageSubscriptionComponent } from './components/user/pages/manage-subscription/manage-subscription.component'




export const routes: Routes = [

  { path: 'dashboard/user', component: DashboardComponent },
  { path: 'user/manage-subscription', component: ManageSubscriptionComponent },
  
  { path: 'main', component: MainComponent },
  { path: 'dashboard/admin', component: DashboardAdminComponent, children: [
    { path: 'membership', component: MembershipComponent },
    { path: 'promotion', component: PromotionComponent },
    { path: 'subscription', component: SubscriptionComponent },
    { path: 'payment', component: PaymentComponent },
    { path: 'payment-method', component: PaymentMethodComponent }
  ] },
  { path: 'federation-login', component: FederationLoginComponent },
  { path: '', redirectTo: '/federation-login', pathMatch: 'full' },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

