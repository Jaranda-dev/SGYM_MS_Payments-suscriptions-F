import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PaymentMethodService } from '../../services/payment-method/payment-method.service';
import { PaymentMethod } from '../../interfaces/payment-method';

import { DataTableComponent } from '../resources/data-table/data-table.component';
import { PaymentMethodCreateComponent } from './payment-method-create/payment-method-create.component';
import { PaymentMethodEditComponent } from './payment-method-edit/payment-method-edit.component';
import { MessageToastComponent } from '../resources/message-toast/message-toast.component';
import { MessageCardComponent } from '../resources/message-card/message-card.component';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTableComponent,
    PaymentMethodCreateComponent,
    PaymentMethodEditComponent,
    MessageToastComponent,
    MessageCardComponent,
  ],
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'], // ✅ Corregido: era "styleUrl"
})
export class PaymentMethodComponent implements OnInit {
  payments: PaymentMethod[] = [];
  headers = ['ID', 'Nombre' ,'Descripción' , 'Activo' ];
  keys = ['id', 'name', 'description', 'isActive'];

  errorMessage = '';
  successMessage = '';

  showCreate = false;
  showEdit = false;
  showDeleteConfirmation = false;

  selectedPaymentMethod: PaymentMethod | null = null;
  paymentMethodDeleted: PaymentMethod | null = null;

  constructor(
    private paymentService: PaymentMethodService, // ✅ Corregido nombre del servicio
    public router: Router
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.showDeleteConfirmation = false;
    this.paymentMethodDeleted = null;
    this.selectedPaymentMethod = null;
    this.showCreate = false;
    this.showEdit = false;
    this.errorMessage = '';

    this.paymentService.getAll().subscribe({
      next: (data) => (this.payments = data),
      error: (err) =>
        (this.errorMessage = err.message || 'Error al cargar métodos de pago'),
    });
  }

  onCreate(): void {
    this.showCreate = true;
  }

  closeCreate(): void {
    this.showCreate = false;
  }

  okCreate(message: string): void {
    this.onSuccess(message);
    this.loadPayments();
  }

  onEdit(item: PaymentMethod): void {
    this.selectedPaymentMethod = item;
    this.showEdit = true;
  }

  closeEdit(): void {
    this.showEdit = false;
    this.selectedPaymentMethod = null;
  }

  okEdit(message: string): void {
    this.onSuccess(message);
    this.loadPayments();
  }

  onDelete(item: PaymentMethod): void {
    this.showDeleteConfirmation = true;
    this.paymentMethodDeleted = item;
  }

  delete(): void {
    if (!this.paymentMethodDeleted) return;

    this.paymentService.delete(this.paymentMethodDeleted.id).subscribe({
      next: () => {
        this.onSuccess('Método de pago eliminado con éxito');
        this.loadPayments();
      },
      error: () => this.onFailure('Error al eliminar método de pago'),
    });

    this.paymentMethodDeleted = null;
  }

  onSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = ''), 2000);
  }

  onFailure(message: string): void {
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ''), 2000);
  }
}
