import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { PaymentMethodService } from '../../../services/payment-method/payment-method.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment-method-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-method-create.component.html',
  styleUrls: ['./payment-method-create.component.css']
})
export class PaymentMethodCreateComponent{
  form: FormGroup
  errorMessage = ''

  @Output() onCancel = new EventEmitter<string>()
  @Output() okCreate = new EventEmitter<string>()
  @Output() errorCreate = new EventEmitter<string>()
 

  constructor(
    private fb: FormBuilder,
    private paymentMethodService: PaymentMethodService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      code: ['', [Validators.required]],
      is_active: [false]
    })
  }
   

  submit() {
    if (this.form.invalid) return

    this.paymentMethodService.create(this.form.value).subscribe({
      next: () => this.handleCreate('Método de pago creado con éxito'),
      error: () => this.handleError('Error creando método de pago')
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