import { Component, OnInit } from '@angular/core'
import {  Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { MembershipService } from '../../services/membership/membership.service'
import { Membership } from '../../interfaces/membership'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from '../resources/data-table/data-table.component'
import { MembershipCreateComponent } from './membership-create/membership-create.component'
import { MembershipEditComponent } from './membership-edit/membership-edit.component'
import { MessageToastComponent } from '../resources/message-toast/message-toast.component'
import { MessageCardComponent } from '../resources/message-card/message-card.component'



@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DataTableComponent,MembershipCreateComponent, MembershipEditComponent, MessageToastComponent,MessageCardComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})

export class MembershipComponent implements OnInit {
  memberships: Membership[] = []
  headers = ['Nombre', 'Duración (días)', 'Precio']
  keys = ['name', 'durationDays', 'price']
  errorMessage = ''
  showCreate = false
  showEdit = false
  selectedMembership: Membership | null = null
  successMessage = ''
  showDeleteConfirmation = false
  membershipdeleted: Membership | null = null

  constructor(private membershipService: MembershipService, public router: Router) {}

  ngOnInit(): void {
   this.loadMemberships()
  }

  

  loadMemberships() {
    this.showDeleteConfirmation = false
    this.membershipdeleted = null

    this.memberships = []
    this.errorMessage = ''
    
    this.selectedMembership = null
    this.showCreate = false
    this.showEdit = false
   
    this.membershipService.getAll().subscribe({
      next: data => (this.memberships = data),
      error: err => (this.errorMessage = err.message || 'Error al cargar membresías')
    })

  }

  

    onDelete(item: Membership) {
      this.showDeleteConfirmation = true
      this.membershipdeleted = item
  }

  delete(){

      this.membershipService.delete(this.membershipdeleted!.id).subscribe({
        next: () => {
          this.onSuccess('Membresía eliminada con éxito')
          this.loadMemberships()
        },
        error: () => this.onFailure('Error al eliminar membresía')
        
      })
      this.membershipdeleted = null
    
  }

  onCreate() {
    this.showCreate = true
}

  closeCreate() {
    this.showCreate = false
  }

  closeEdit() {
    this.showEdit = false
    this.selectedMembership = null
  }

  onEdit(item: Membership) {
    this.selectedMembership = item
    this.showEdit = true
  }

  okCreate(message: string) {
    this.onSuccess(message)
    this.loadMemberships()
  }
  okEdit(message: string) {
    this.onSuccess(message)
    this.loadMemberships()
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

 

