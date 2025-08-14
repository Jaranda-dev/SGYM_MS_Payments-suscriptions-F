import { Component, OnInit } from '@angular/core'
import {  Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { Promotion } from '../../interfaces/promotion'
import { PromotionService } from '../../services/promotion/promotion.service'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from '../resources/data-table/data-table.component'
import { PromotionCreateComponent } from './promotion-create/promotion-create.component'
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component'
import { MessageToastComponent } from '../resources/message-toast/message-toast.component'
import { MessageCardComponent } from '../resources/message-card/message-card.component'
@Component({
  selector: 'app-promotion',
  imports: [ CommonModule, ReactiveFormsModule, DataTableComponent, PromotionCreateComponent, PromotionEditComponent, MessageToastComponent, MessageCardComponent],
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})


export class PromotionComponent  implements OnInit {
  promotions: Promotion[] = []
  headers = ['Nombre', 'Descuento', 'Membresía']
  keys = ['name', 'discount', 'membership.name']
  errorMessage = ''
  showCreate = false
  showEdit = false
  selectedPromotion: Promotion | null = null
  successMessage = ''
  showDeleteConfirmation = false
  promotionDeleted: Promotion | null = null

  constructor(private promotionService: PromotionService, public router: Router) {}

  ngOnInit(): void {
    this.loadPromotions()
  }

  loadPromotions() {
    this.showDeleteConfirmation = false
    this.promotionDeleted = null

    this.promotions = []
    this.errorMessage = ''

    this.selectedPromotion = null
    this.showCreate = false
    this.showEdit = false

    this.promotionService.getAll().subscribe({
      next: data => (this.promotions = data),
      error: err => (this.errorMessage = err.message || 'Error al cargar promociones')
    })
  }

      onDelete(item: Promotion) {
        this.showDeleteConfirmation = true
        this.promotionDeleted = item
    }
  
    delete(){

        this.promotionService.delete(this.promotionDeleted!.id).subscribe({
          next: () => {
            this.onSuccess('Promoción eliminada con éxito')
            this.loadPromotions()
          },
          error: () => this.onFailure('Error al eliminar promoción')

        })
        this.promotionDeleted = null

    }
  
    onCreate() {
      this.showCreate = true
  }
  
    closeCreate() {
      this.showCreate = false
    }
  
    closeEdit() {
      this.showEdit = false
      this.selectedPromotion = null
    }

    onEdit(item: Promotion) {
      this.selectedPromotion = item
      this.showEdit = true
    }
  
    okCreate(message: string) {
      this.onSuccess(message)
      this.loadPromotions()
    }
    okEdit(message: string) {
      this.onSuccess(message)
      this.loadPromotions()
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

 