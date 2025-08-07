import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { MembershipService } from '../../../services/membership/membership.service';
import { CommonModule } from '@angular/common';
import { Promotion } from '../../../interfaces/promotion';




@Component({
  selector: 'app-promotion-edit',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './promotion-edit.component.html',
  styleUrl: './promotion-edit.component.css'
})
export class PromotionEditComponent {
  form: FormGroup
  errorMessage = ''
 

  @Input() promotion !: Promotion

  @Output() onCancel = new EventEmitter<any>()
  @Output() okEdit  = new EventEmitter<any>()
  @Output() onFailure = new EventEmitter<any>()


  constructor(
    private fb: FormBuilder,
    private membershipService: MembershipService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    })
}

  submit() {
    if (this.form.invalid) return

    this.membershipService.update(this.promotion.id, this.form.value).subscribe({
      next: () => this.handleEdit('Promoción editada con éxito'),
      error: () => this.handleError('Error editando promoción')
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
    if (this.promotion) {
      this.form.patchValue({
        name: this.promotion.name,
        discount: this.promotion.discount,
        startDate: this.promotion.startDate,
        endDate: this.promotion.endDate
      })
    }
  }

} 