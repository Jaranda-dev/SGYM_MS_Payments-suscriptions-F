import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { Membership } from '../../../../interfaces/membership';
import { Promotion } from '../../../../interfaces/promotion';
import { UserPaymentMethod } from '../../../../interfaces/user-payment-method';

@Component({
  selector: 'app-subscribe',
  imports: [NgIf, TitleCasePipe],
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})

export class SubscribeComponent {
  
@Input() selectedMembership: Membership | null = null;
@Input() selectedUserPaymentMethod: UserPaymentMethod | null = null;
@Input() selectedPromotion: Promotion | null = null;

@Output() ChangeMembership = new EventEmitter<void>();
@Output() ChangePaymentMethod = new EventEmitter<void>();
@Output() ChangePromotion = new EventEmitter<void>();
@Output() ConfirmSubscription = new EventEmitter<void>();




handleChangePaymentMethod() {
 
  this.ChangePaymentMethod.emit();
}

handleChangePromotion() {

  this.ChangePromotion.emit();
}

handleConfirmSubscription() {

  this.ConfirmSubscription.emit();
}

handleChangeMembership() {
  this.ChangeMembership.emit();
}




}
