import { Component } from '@angular/core';
import { PaymentService } from '../../../../services/payment/payment.service';
import { Payment } from '../../../../interfaces/payment';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-payment-history',
  imports: [CommonModule],
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent {
  constructor(private paymentService: PaymentService) { }
  payments: Payment[] = [];

  ngOnInit() {
    this.loadPaymentHistory();
  }

  loadPaymentHistory() {
    this.paymentService.getByUser().subscribe(payments => {
      console.log('User payments:', payments);
      this.payments = payments;
    });
  } 


}
