import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipListComponent } from '../../components/membership-list/membership-list.component';
import { PaymentMethodListComponent } from '../../components/payment-method-list/payment-method-list.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';

import { Membership } from '../../../../interfaces/membership';
import { UserPaymentMethod } from '../../../../interfaces/user-payment-method';
import { Promotion } from '../../../../interfaces/promotion';

import { MembershipService } from '../../../../services/membership/membership.service';
import { UserPaymentMethodService } from '../../../../services/user-payment-method/user-payment-method.service';
import { PromotionService } from '../../../../services/promotion/promotion.service';

import { SubscriptionService } from '../../../../services/subscription/subscription.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-subscription',
  standalone: true,
  imports: [CommonModule, MembershipListComponent, PaymentMethodListComponent, SubscribeComponent],
  templateUrl: './manage-subscription.component.html',
  styleUrls: ['./manage-subscription.component.css']
})
export class ManageSubscriptionComponent {
  headerTitle = 'Gestionar Suscripción';
  title = 'Seleccionar Membresía';

  promotions: Promotion[] = [];
  selectedMembership: Membership | null = null;
  selectedUserPaymentMethod: UserPaymentMethod | null = null;
  selectedPromotion: Promotion | null = null;
  isRenewal: boolean = false;

  view = {
    memberships: true,
    promotions: false,
    paymentMethods: false,
    subscribe: false
  };

  constructor(
    private membershipService: MembershipService,
    private userPaymentMethodService: UserPaymentMethodService,
    private promotionService: PromotionService,
    private subscriptionService: SubscriptionService,
   private router: Router
  ) {}

  ngOnInit() {
    this.getDefaultPaymentMethod();
  }

  private setView(partial: Partial<typeof this.view>, newTitle?: string) {
    this.view = { memberships: false, promotions: false, paymentMethods: false, subscribe: false, ...partial };
    if (newTitle) this.title = newTitle;
  }

  async handleMembershipSelected(membership: Membership) {
    this.selectedMembership = membership;
    await this.getPromotionByMembershipId(membership.id);
    console.log('Seleccionadas:', this.promotions);
    if (this.promotions.length > 0) {
      this.setView({ promotions: true }, 'Seleccionar Promoción');
    } else {
      this.setView({ paymentMethods: true }, 'Seleccionar Método de Pago');
    }
  }

  selectPromotion(promotion: Promotion) {
    this.selectedPromotion = promotion;
    this.getDefaultPaymentMethod();
    this.setView({ subscribe: true }, '');
  }

  handleChangeMembership() {
    this.setView({ memberships: true }, 'Seleccionar Membresía');
  }

  handleChangePaymentMethod() {
    this.setView({ paymentMethods: true }, 'Seleccionar Método de Pago');
  }

  handleChangePromotion() {
    this.setView({ promotions: true }, 'Seleccionar Promoción');
  }

  handlePaymentMethodSelected() {
    this.setView({ subscribe: true } , '');
  }

  handleConfirmSubscription() {
    if (this.selectedMembership && this.selectedUserPaymentMethod) {
      this.subscriptionService.subscribeToMembership({
        MembershipId: this.selectedMembership.id,
        PaymentMethodId: this.selectedUserPaymentMethod.id,

        PromotionId: this.selectedPromotion ? this.selectedPromotion.id : undefined,
        isRenewable: this.isRenewal
      }).subscribe({
        next: () => {
          console.log('Suscripción confirmada');
          this.router.navigate(['dashboard/user']);
        },
        error: err => console.error('Error confirming subscription:', err)
      });
    }
  }
handleChangeRenewal(event: boolean) {
    this.isRenewal = event;
    console.log('Renovación:', this.isRenewal);

}
  

   async  getPromotionByMembershipId(membershipId: number) {
    this.promotionService.getPromotionByMembershipId(membershipId).subscribe({
      next: data => {
        this.promotions = data || [];
        console.log(`Promotions for membership ${membershipId}:`, this.promotions);
      },
      error: err => console.error('Error fetching promotion:', err)
    });
  }

  async getDefaultPaymentMethod() {
    this.userPaymentMethodService.getDefault().subscribe({
      next: data =>{
console.log('Default payment method data:', data);
this.selectedUserPaymentMethod = data;
      }, 
      
      error: err => console.error('Error fetching default payment method:', err)
    });
    console.log('Default payment method:', this.selectedUserPaymentMethod);
  }
}
