import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { CommonModule } from '@angular/common';
import { SubscriptionService } from '../../../services/subscription/subscription.service';





@Component({
  selector: 'app-subscription-create',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-create.component.html',
  styleUrl: './subscription-create.component.css'
})
export class SubscriptionCreateComponent  {
  form: FormGroup
  errorMessage = ''

  @Output() onCancel = new EventEmitter<string>()
  @Output() okCreate = new EventEmitter<string>()
  @Output() errorCreate = new EventEmitter<string>()
 

  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userId: ['', [Validators.required, Validators.min(1)]],
      membershipId: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: ['active', [Validators.required]]
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

}