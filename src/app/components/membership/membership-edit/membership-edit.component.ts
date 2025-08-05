import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MembershipService } from '../../../services/membership/membership.service';
import { CommonModule } from '@angular/common';
import { Membership } from '../../../interfaces/membership';

@Component({
  selector: 'app-membership-edit',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './membership-edit.component.html',
  styleUrl: './membership-edit.component.css'
})
export class MembershipEditComponent {
  form: FormGroup
  errorMessage = ''
 

  @Input() membership !: Membership

  @Output() onCancel = new EventEmitter<any>()
  @Output() okEdit  = new EventEmitter<any>()
 

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

    this.membershipService.update(this.membership.id, this.form.value).subscribe({
      next: () => this.handleEdit(),
      error: err => (this.errorMessage = err.message || 'Error editando membresía')
    })
  }

  handleCancel() {
    this.onCancel.emit()
  }

  handleEdit() {
    this.okEdit.emit('Membresía editada con éxito')
  }

  ngOnChanges() {
    if (this.membership) {
      this.form.patchValue({
        name: this.membership.name,
        durationDays: this.membership.durationDays,
        price: this.membership.price
      })
    }
  }

} 