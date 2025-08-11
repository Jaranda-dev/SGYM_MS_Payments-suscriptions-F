import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SubscriptionHistoryComponent } from '../../components/subscription-history/subscription-history.component';
import { PaymentHistoryComponent } from "../../components/payment-history/payment-history.component";
import { MembershipListComponent } from "../../components/membership-list/membership-list.component";



@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SubscriptionHistoryComponent, PaymentHistoryComponent, MembershipListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

}
