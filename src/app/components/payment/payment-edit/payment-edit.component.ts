import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { PaymentService } from '../../../services/payment/payment.service';
import { CommonModule } from '@angular/common';
import { Payment } from '../../../interfaces/payment';

@Component({
  selector: 'app-payment-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-edit.component.html',
  styleUrl: './payment-edit.component.css'
})
export class PaymentEditComponent{
  form: FormGroup
  errorMessage = ''

  @Input() payment !: Payment

  @Output() onCancel = new EventEmitter<any>()
  @Output() okEdit  = new EventEmitter<any>()
  @Output() onFailure = new EventEmitter<any>()


  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userId: ['', [Validators.required]],
      paymentRequestId: ['', [Validators.required]],
      paymentMethodId: ['', [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]]
    })
  }

  submit() {
    if (this.form.invalid) return

    this.paymentService.update(this.payment.id, this.form.value).subscribe({
      next: () => this.handleEdit('Pago editado con éxito'),
      error: () => this.handleError('Error editando pago')
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
    if (this.payment) {
      this.form.patchValue({
        userId: this.payment.userId,
        paymentRequestId: this.payment.paymentRequestId,
        paymentMethodId: this.payment.paymentMethodId,
        amount: this.payment.amount,
        status: this.payment.status
      })
    }
  }

} 