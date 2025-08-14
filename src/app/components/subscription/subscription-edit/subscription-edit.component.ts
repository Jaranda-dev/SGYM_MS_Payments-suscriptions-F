import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { CommonModule } from '@angular/common';

import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { Subscription } from '../../../interfaces/subscription'

import { MembershipService } from '../../../services/membership/membership.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { Membership } from '../../../interfaces/membership';
import { PaymentMethodService } from '../../../services/payment-method/payment-method.service';
import { PaymentMethod } from '../../../interfaces/payment-method';




@Component({
  selector: 'app-subscription-edit',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-edit.component.html',
  styleUrl: './subscription-edit.component.css'
})
export class SubscriptionEditComponent {
  form: FormGroup
  errorMessage = ''
   users: User[] = []
  memberships: Membership[] = []
  paymentMethods: PaymentMethod[] = []

  ngOnInit() {
    this.loadUsers()
    this.loadMemberships()
    this.loadPaymentMethods()
  }

  @Input() subscription !: Subscription

  @Output() onCancel = new EventEmitter<any>()
  @Output() okEdit  = new EventEmitter<any>()
  @Output() onFailure = new EventEmitter<any>()


  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService  ,
    private router: Router,
        private userService: UserService,
    private membershipService: MembershipService,
    private paymentMethodService: PaymentMethodService
  ) {
    this.form = this.fb.group({
      
      membershipId: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['active', [Validators.required]]
    })
}

  submit() {
    if (this.form.invalid) return

    this.subscriptionService.update(this.subscription.id, this.form.value).subscribe({
      next: () => this.handleEdit('Suscripción editada con éxito'),
      error: () => this.handleError('Error editando suscripción')
    })
  }

  handleCancel() {
    this.onCancel.emit()
  }

  handleEdit(message: string) {
    this.okEdit.emit(message)
  }

  handleError(message: string) {
    this.onFailure.emit(message)
  }

  ngOnChanges() {
    if (this.subscription) {
      this.form.patchValue({
        userId: this.subscription.userId,
        membershipId: this.subscription.membershipId,
        startDate: this.subscription.startDate,
        endDate: this.subscription.endDate,
        status: this.subscription.status
      })
    }
  }

    loadUsers() {
    this.userService.getAll().subscribe({
      next: (users) => this.users = users,
      error: () => this.handleError('Error cargando usuarios')
    })
  }

  loadMemberships() {
    this.membershipService.getAll().subscribe({
      next: (memberships) => this.memberships = memberships,
      error: () => this.handleError('Error cargando membresías')
    })
  }

  loadPaymentMethods() {
    this.paymentMethodService.getAll().subscribe({
      next: (paymentMethods) => this.paymentMethods = paymentMethods,
      error: () => this.handleError('Error cargando métodos de pago')
    })
  }


} 