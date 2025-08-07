import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})


export class SidebarComponent {
menuItems = [
  { path: '/membership', label: 'Membresías', icon: '💳' },
  { path: '/payment_method', label: 'Métodos de Pago', icon: '💼' },
  { path: '/payment', label: 'Pagos', icon: '💰' },
  { path: '/promotion', label: 'Promociones', icon: '🎉' },
  { path: '/subscription', label: 'Suscripciones', icon: '📆' },
];

}
