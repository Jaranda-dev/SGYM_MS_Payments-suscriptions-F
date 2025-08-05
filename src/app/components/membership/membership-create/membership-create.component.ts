import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MembershipService } from '../../../services/membership/membership.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-membership-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './membership-create.component.html',
  styleUrl: './membership-create.component.css'
})
export class MembershipCreateComponent {
  form: FormGroup
  errorMessage = ''

  @Output() onCancel = new EventEmitter<any>()
  @Output() okCreate = new EventEmitter<any>()
 

  constructor(
    private fb: FormBuilder,
    private membershipService: MembershipService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      durationDays: [30, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]]
    })
  }

  submit() {
    if (this.form.invalid) return

    this.membershipService.create(this.form.value).subscribe({
      next: () => this.handleCreate(),
      error: err => (this.errorMessage = err.message || 'Error creando membresía')
    })
  }

  handleCancel() {
    this.onCancel.emit()
  }

  handleCreate() {
    this.okCreate.emit('Membresía creada con éxito')
  }

}