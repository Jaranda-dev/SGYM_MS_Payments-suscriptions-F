import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { MembershipService } from '../../../services/membership/membership.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/user';
import { Membership } from '../../../interfaces/membership';
import { PaymentMethodService } from '../../../services/payment-method/payment-method.service';
import { PaymentMethod } from '../../../interfaces/payment-method';






@Component({
  selector: 'app-subscription-create',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-create.component.html',
  styleUrl: './subscription-create.component.css'
})
export class SubscriptionCreateComponent implements OnInit {
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


  @Output() onCancel = new EventEmitter<string>()
  @Output() okCreate = new EventEmitter<string>()
  @Output() errorCreate = new EventEmitter<string>()
 

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private router: Router,
    private userService: UserService,
    private membershipService: MembershipService,
    private paymentMethodService: PaymentMethodService
  ) {
    this.form = this.fb.group({
      userId: ['', [Validators.required, Validators.min(1)]],
      membershipId: ['', [Validators.required, Validators.min(1)]],
      paymentMethodId: ['', [Validators.required, Validators.min(1)]],
    })
  }

  submit() {
    if (this.form.invalid) return

    this.subscriptionService.create(this.form.value).subscribe({
      next: () => this.handleCreate('Suscripción creada con éxito'),
      error: () => this.handleError('Error creando suscripción')
    })
  }

  handleCancel() {
    this.onCancel.emit()
  }

  handleCreate(message: string ) {
    this.okCreate.emit(message)
  }

  handleError(message: string) {
    this.errorCreate.emit(message)
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