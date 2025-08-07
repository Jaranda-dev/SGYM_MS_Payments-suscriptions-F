import { Component, OnInit } from '@angular/core'
import {  Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { Subscription } from '../../interfaces/subscription'
import { SubscriptionService } from '../../services/subscription/subscription.service'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from '../resources/data-table/data-table.component'
import { SubscriptionCreateComponent } from './subscription-create/subscription-create.component'
import { SubscriptionEditComponent } from './subscription-edit/subscription-edit.component'
import { MessageToastComponent } from '../resources/message-toast/message-toast.component'
import { MessageCardComponent } from '../resources/message-card/message-card.component'




@Component({
  selector: 'app-subscription',
  imports: [ CommonModule, ReactiveFormsModule, DataTableComponent, SubscriptionCreateComponent, SubscriptionEditComponent, MessageToastComponent, MessageCardComponent ],
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptions: Subscription[] = []
  headers = ['Usuario', 'Membresía', 'Fecha de Inicio', 'Fecha de Fin', 'Estado']
  keys = ['userId', 'membershipId', 'startDate', 'endDate', 'status']
  errorMessage = ''
  showCreate = false
  showEdit = false
  selectedSubscription: Subscription | null = null
  successMessage = ''
  showDeleteConfirmation = false
  subscriptionDeleted: Subscription | null = null

  constructor(private subscriptionService: SubscriptionService, public router: Router) {}

  ngOnInit(): void {
   this.loadSubscriptions()
  }


  loadSubscriptions() {
    this.showDeleteConfirmation = false
    this.subscriptionDeleted = null

    this.subscriptions = []
    this.errorMessage = ''

    this.selectedSubscription = null
    this.showCreate = false
    this.showEdit = false

    this.subscriptionService.getAll().subscribe({
      next: data => (this.subscriptions = data),
      error: err => (this.errorMessage = err.message || 'Error al cargar suscripciones')
    })

  }


    onDelete(item: Subscription) {
      this.showDeleteConfirmation = true
      this.subscriptionDeleted = item
  }

  delete(){

      this.subscriptionService.delete(this.subscriptionDeleted!.id).subscribe({
        next: () => {
          this.onSuccess('Suscripción eliminada con éxito')
          this.loadSubscriptions()
        },
        error: () => this.onFailure('Error al eliminar suscripción')

      })
      this.subscriptionDeleted = null

  }

  onCreate() {
    this.showCreate = true
}

  closeCreate() {
    this.showCreate = false
  }

  closeEdit() {
    this.showEdit = false
    this.selectedSubscription = null
  }

  onEdit(item: Subscription) {
    this.selectedSubscription = item
    this.showEdit = true
  }

  okCreate(message: string) {
    this.onSuccess(message)
    this.loadSubscriptions()
  }
  okEdit(message: string) {
    this.onSuccess(message)
    this.loadSubscriptions()
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

 

