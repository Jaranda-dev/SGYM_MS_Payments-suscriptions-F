import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { PaymentMethodService } from '../../../services/payment-method/payment-method.service';
import { CommonModule } from '@angular/common';
import { PaymentMethod } from '../../../interfaces/payment-method';

@Component({
  selector: 'app-payment-method-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent {
  form: FormGroup
  errorMessage = ''

  @Input() paymentMethod : PaymentMethod | null = null

  @Output() onCancel = new EventEmitter<any>()
  @Output() okEdit  = new EventEmitter<any>()
  @Output() onFailure = new EventEmitter<any>()

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

    this.paymentMethodService.update(this.paymentMethod!.id, this.form.value).subscribe({
      next: () => this.handleEdit('Método de pago editado con éxito'),
      error: () => this.handleError('Error editando método de pago')
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
    if (this.paymentMethod) {
      this.form.patchValue({
        name: this.paymentMethod.name,
        description: this.paymentMethod.description,
        code: this.paymentMethod.code,
        is_active: this.paymentMethod.is_active
      })
    }
  }

}
     