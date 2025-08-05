import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MembershipService } from '../../services/membership/membership.service'
import { Membership } from '../../interfaces/membership'
import { CommonModule } from '@angular/common'
import { DataTableComponent } from '../data-table/data-table.component'
import { MembershipCreateComponent } from './membership-create/membership-create.component'

import { MembershipEditComponent } from './membership-edit/membership-edit.component'




@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,DataTableComponent,MembershipCreateComponent, MembershipEditComponent],
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

  constructor(private membershipService: MembershipService, public router: Router) {}

  ngOnInit(): void {
   this.loadMemberships()
  }

  loadMemberships() {
    this.membershipService.getAll().subscribe({
      next: data => (this.memberships = data),
      error: err => (this.errorMessage = err.message || 'Error al cargar membresías')
    })
  }

  

  onDelete(item: Membership) {
    if (confirm(`¿Eliminar membresía "${item.name}"?`)) {
      this.membershipService.delete(item.id).subscribe({
        next: () => {
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
    this.loadMemberships()
  }

  closeEdit() {
    this.showEdit = false
    this.loadMemberships()
  }
  onEdit(item: Membership) {
    console.log('Editing membership:', item)
    this.selectedMembership = item
    this.showEdit = true
  }

}

 

