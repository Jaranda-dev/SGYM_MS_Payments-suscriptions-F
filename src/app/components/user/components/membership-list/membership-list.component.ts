import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipService } from '../../../../services/membership/membership.service';
import { Membership } from '../../../../interfaces/membership';
import { MembershipCardsComponent } from '../../../resources/membership-cards/membership-cards.component';

@Component({
  selector: 'app-membership-list',
  imports: [CommonModule, MembershipCardsComponent],
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.css']
})
export class MembershipListComponent {
  memberships: Membership[] = [];
  selectedMembership: Membership | null = null;
  @Input() showButton: boolean = true;
  @Output() membershipSelected: EventEmitter<Membership> = new EventEmitter<Membership>();

  constructor(private membershipService: MembershipService) { }

  ngOnInit() {
    this.loadMemberships();
  }

  loadMemberships() {
    this.membershipService.getAll().subscribe(memberships => {
      console.log('Memberships:', memberships);
      this.memberships = memberships;
    });
  }

  selectMembership(membership: Membership) {
    this.selectedMembership = membership;
    this.membershipSelected.emit(membership);
  }



}
