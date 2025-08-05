import { Component, Input , Output, EventEmitter} from '@angular/core';
import { Membership } from '../../interfaces/membership';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-membership-cards',
  imports: [CommonModule],
  templateUrl: './membership-cards.component.html',
  styleUrl: './membership-cards.component.css'
})
export class MembershipCardsComponent {
@Input() membership!: Membership
 @Input() buttonText: string = 'Seleccionar' 

 @Output() onSelect = new EventEmitter<Membership>()
  @Output() onEdit = new EventEmitter<Membership>()
  @Output() onDelete = new EventEmitter<Membership>()

  handleSelect() {
    this.onSelect.emit(this.membership)
  }

  handleEdit() {
    this.onEdit.emit(this.membership)
  }

  handleDelete() {
    this.onDelete.emit(this.membership)
  }

}

