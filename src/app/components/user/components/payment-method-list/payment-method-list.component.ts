import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserPaymentMethodService } from '../../../../services/user-payment-method/user-payment-method.service';
import { UserPaymentMethod } from '../../../../interfaces/user-payment-method';
import { CommonModule } from '@angular/common';
import { AddPaymentMethodComponent } from '../add-payment-method/add-payment-method.component';
import { MessageToastComponent } from '../../../resources/message-toast/message-toast.component';
@Component({
  selector: 'app-payment-method-list',
  imports: [CommonModule, AddPaymentMethodComponent, MessageToastComponent],
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent {
  @Output() paymentMethodSelected = new EventEmitter<void>();
  @Output() paymentMethodCreated = new EventEmitter<void>();
  constructor(private userPaymentMethodService: UserPaymentMethodService) { }
  userPaymentMethod: UserPaymentMethod[] = [];
  showCreate: boolean = false;

  errorMessage = '';
  successMessage = '';
  ngOnInit() {
    this.loadPaymentHistory();
    
  }

  loadPaymentHistory() {
    this.userPaymentMethodService.getByUser().subscribe(userPaymentMethod => {
      console.log('User payments:', userPaymentMethod);
      this.userPaymentMethod = userPaymentMethod;
    });
  } 

  deleteMethod(id: number) {
    this.userPaymentMethodService.delete(id).subscribe({
      next: () => {
        console.log('Método de pago eliminado:', id);
        this.loadPaymentHistory();
        this.successMessage = 'Método de pago eliminado con éxito';
        
      },
      error: (error) => {
        console.error('Error al eliminar el método de pago:', error);
        this.errorMessage = 'Error al eliminar el método de pago';
      }
    });
  }
  crearMetodo() {
    // Aquí puedes implementar la lógica para crear un nuevo método de pago
    console.log('Crear nuevo método de pago');
  }



  setDefaultMethod(method: UserPaymentMethod) {
    method.isDefault = true;

    this.userPaymentMethodService.update(method.id, method).subscribe({
      next: () => {
        console.log('Método de pago establecido como predeterminado:', method.id);
        this.loadPaymentHistory();
        this.paymentMethodSelected.emit();
      },
      error: (error) => {
        console.error('Error al establecer el método de pago como predeterminado:', error);
        this.errorMessage = 'Error al establecer el método de pago como predeterminado';
      }
    });
  }
  addPaymentMethod() {
    this.showCreate = true;
  }

  closeCreate() {
    this.showCreate = false;
  }
  onAddSuccess(id: number) {
    console.log('Éxito al agregar método de pago:', id);
    this.successMessage = 'Método de pago agregado exitosamente';
    setTimeout(() => (this.successMessage = ''), 2000);
    this.loadPaymentHistory();
    this.closeCreate();
    this.paymentMethodCreated.emit();

  }
  onAddFailure(message: string) {
    console.log('Fallo al agregar método de pago:', message);
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ''), 2000);
    this.closeCreate();
  }

  handlePaymentMethodSelected() {
    this.paymentMethodSelected.emit();
  }

 

}
