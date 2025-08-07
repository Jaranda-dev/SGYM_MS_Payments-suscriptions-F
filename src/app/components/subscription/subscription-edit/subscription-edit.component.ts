import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'

import { CommonModule } from '@angular/common';

import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { Subscription } from '../../../interfaces/subscription'




@Component({
  selector: 'app-subscription-edit',
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './subscription-edit.component.html',
  styleUrl: './subscription-edit.component.css'
})
export class SubscriptionEditComponent {
  form: FormGroup
  errorMessage = ''
 

  @Input() subscription !: Subscription

  @Output() onCancel = new EventEmitter<any>()
  @Output() okEdit  = new EventEmitter<any>()
  @Output() onFailure = new EventEmitter<any>()


  constructor(
    private fb: FormBuilder,
    private subscriptionService: SubscriptionService  ,
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

} 