import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { PromotionService } from '../../../services/promotion/promotion.service';
import { CommonModule } from '@angular/common';
import { MembershipService } from '../../../services/membership/membership.service';
import { Membership } from '../../../interfaces/membership';
@Component({
  selector: 'app-promotion-create',
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './promotion-create.component.html',
  styleUrl: './promotion-create.component.css'
})
export class PromotionCreateComponent implements OnInit {
  form: FormGroup
  errorMessage = ''
  memberships: Membership[] = []

  @Output() onCancel = new EventEmitter<string>()
  @Output() okCreate = new EventEmitter<string>()
  @Output() errorCreate = new EventEmitter<string>()
 

  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private router: Router,
    private membershipService: MembershipService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      membershipId: [null, [Validators.required]]
    })
  }

  submit() {
    if (this.form.invalid) return

    this.promotionService.create(this.form.value).subscribe({
      next: () => this.handleCreate('Promoción creada con éxito'),
      error: () => this.handleError('Error creando promoción')
    })
  }

  handleCancel() {
    this.onCancel.emit()
  }

  handleCreate(message: string ) {
    this.okCreate.emit(message)
  }

  handleError(message: string) {
    this.errorCreate.emit(message)
  }

   loadMemberships() {

    this.membershipService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.memberships = data;
      },
      error: (err) => (this.errorMessage = err.message || 'Error al cargar membresías')
    })
  }

  ngOnInit() {
    this.loadMemberships()
  }

}