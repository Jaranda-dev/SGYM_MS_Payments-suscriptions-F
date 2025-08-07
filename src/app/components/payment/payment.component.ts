import { Component, OnInit } from '@angular/core'
import {  Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { PaymentService } from '../../services/payment/payment.service'
import { Payment } from '../../interfaces/payment'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from '../resources/data-table/data-table.component'
import { PaymentCreateComponent } from './payment-create/payment-create.component'
import { PaymentEditComponent } from './payment-edit/payment-edit.component'
import { MessageToastComponent } from '../resources/message-toast/message-toast.component'
import { MessageCardComponent } from '../resources/message-card/message-card.component'


@Component({
  selector: 'app-payment',
  imports: [CommonModule, ReactiveFormsModule, DataTableComponent, PaymentCreateComponent, PaymentEditComponent, MessageToastComponent, MessageCardComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = []
  headers = ['Fecha', 'Monto', 'Método de Pago']
  keys = ['date', 'amount', 'paymentMethod']
  errorMessage = ''
  showCreate = false
  showEdit = false
  selectedPayment: Payment | null = null
  successMessage = ''
  showDeleteConfirmation = false
  paymentDeleted: Payment | null = null

  constructor(private paymentService: PaymentService, public router: Router) {}

  ngOnInit(): void {
    this.loadPayments()
  }

  loadPayments() {
    this.showDeleteConfirmation = false
    this.paymentDeleted = null

    this.payments = []
    this.errorMessage = ''
    
    this.selectedPayment = null
    this.showCreate = false
    this.showEdit = false
   
    this.paymentService.getAll().subscribe({
      next: data => (this.payments = data),
      error: err => (this.errorMessage = err.message || 'Error al cargar pagos')
    })
  }

      onDelete(item: Payment) {
        this.showDeleteConfirmation = true
        this.paymentDeleted = item
    }
  
    delete(){

        this.paymentService.delete(this.paymentDeleted!.id).subscribe({
          next: () => {
            this.onSuccess('Pago eliminado con éxito')
            this.loadPayments()
          },
          error: () => this.onFailure('Error al eliminar pago')

        })
        this.paymentDeleted = null

    }
  
    onCreate() {
      this.showCreate = true
  }
  
    closeCreate() {
      this.showCreate = false
    }
  
    closeEdit() {
      this.showEdit = false
      this.selectedPayment = null
    }

    onEdit(item: Payment) {
      this.selectedPayment = item
      this.showEdit = true
    }
  
    okCreate(message: string) {
      this.onSuccess(message)
      this.loadPayments()
    }
    okEdit(message: string) {
      this.onSuccess(message)
      this.loadPayments()
    }
  
  
    onSuccess(message: string) {
      this.successMessage = message
      setTimeout(() => (this.successMessage = ''), 2000)
    }
    
    onFailure(message: string) {
      this.errorMessage = message
      setTimeout(() => (this.errorMessage = ''), 2000)
    }
}

 