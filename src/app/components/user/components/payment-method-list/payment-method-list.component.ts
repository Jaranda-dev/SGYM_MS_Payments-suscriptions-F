import { Component } from '@angular/core';
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
export class PaymentMethodListComponent{
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
      },
      error: (error) => {
        console.error('Error al eliminar el método de pago:', error);
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
        console.log('Método de pago establecido como predeterminado:', method);
        this.loadPaymentHistory();
      },
      error: (error) => {
        console.error('Error al establecer el método de pago como predeterminado:', error);
      }
    });
  }
  addPaymentMethod() {
    this.showCreate = true;
  }

  closeCreate() {
    this.showCreate = false;
  }
  onAddSuccess(message: string) {
    console.log('Éxito al agregar método de pago:', message);
    this.successMessage = message;
    setTimeout(() => (this.successMessage = ''), 2000);
    this.loadPaymentHistory();
    this.closeCreate();
  }
  onAddFailure(message: string) {
    console.log('Fallo al agregar método de pago:', message);
    this.errorMessage = message;
    setTimeout(() => (this.errorMessage = ''), 2000);
    this.closeCreate();
  }
 

}
