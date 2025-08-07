import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { PaymentService } from '../../../services/payment/payment.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-payment-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-create.component.html',
  styleUrl: './payment-create.component.css'
})
export class PaymentCreateComponent {
  form: FormGroup
  errorMessage = ''

  @Output() onCancel = new EventEmitter<string>()
  @Output() okCreate = new EventEmitter<string>()
  @Output() errorCreate = new EventEmitter<string>()
 

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userId: [0, [Validators.required]],
      paymentRequestId: [0, [Validators.required]],
      paymentMethodId: [0, [Validators.required]],
      amount: [0, [Validators.required, Validators.min(0)]],
      status: ['success', [Validators.required]]
    })
  }
   

  submit() {
    if (this.form.invalid) return

    this.paymentService.create(this.form.value).subscribe({
      next: () => this.handleCreate('Pago creado con éxito'),
      error: () => this.handleError('Error creando pago')
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