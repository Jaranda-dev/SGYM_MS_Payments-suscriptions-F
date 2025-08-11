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
import { PermissionGuard } from './guards/permission.guard'




export const routes: Routes = [

  { path: 'dashboard/user', component: DashboardComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/user' } },
  { path: 'user/manage-subscription', component: ManageSubscriptionComponent, canActivate: [PermissionGuard], data: { page: 'user/manage-subscription' } },
  { path: 'main', component: MainComponent, canActivate: [PermissionGuard], data: { page: 'main' } },
  { path: 'dashboard/admin', component: DashboardAdminComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/admin' }, children: [
    { path: 'membership', component: MembershipComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/admin/membership' } },
    { path: 'promotion', component: PromotionComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/admin/promotion' } },
    { path: 'subscription', component: SubscriptionComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/admin/subscription' } },
    { path: 'payment', component: PaymentComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/admin/payment' } },
    { path: 'payment-method', component: PaymentMethodComponent, canActivate: [PermissionGuard], data: { page: 'dashboard/admin/payment-method' } }
  ] },
  { path: 'federation-login', component: FederationLoginComponent },
  { path: '', redirectTo: '/federation-login', pathMatch: 'full' },


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

