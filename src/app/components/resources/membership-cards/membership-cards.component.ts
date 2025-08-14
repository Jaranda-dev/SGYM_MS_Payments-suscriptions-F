import { Component, Input , Output, EventEmitter, input} from '@angular/core';
import { Membership } from '../../../interfaces/membership';
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
  @Input() showButton: boolean = true;
 @Output() onSelect = new EventEmitter<Membership>()


  handleSelect() {
    this.onSelect.emit(this.membership)
  }

 }

