import { Component, OnInit } from '@angular/core'
import {  Router } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { MembershipService } from '../../services/membership/membership.service'
import { Membership } from '../../interfaces/membership'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from '../data-table/data-table.component'
import { MembershipCreateComponent } from './membership-create/membership-create.component'
import { MembershipEditComponent } from './membership-edit/membership-edit.component'
import { MessageToastComponent } from '../resources/message-toast/message-toast.component'



@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DataTableComponent,MembershipCreateComponent, MembershipEditComponent, MessageToastComponent],
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

  constructor(private membershipService: MembershipService, public router: Router) {}

  ngOnInit(): void {
   this.loadMemberships()
  }

  

  loadMemberships() {

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
    if (confirm(`¿Eliminar membresía "${item.name}"?`)) {
      this.membershipService.delete(item.id).subscribe({
        next: () => {
          this.onSuccess('Membresía eliminada con éxito')
          this.memberships = this.memberships.filter(m => m.id !== item.id)
        },
        error: err => alert(err.message || 'Error al eliminar')
      })
    }
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

 

