import { Component } from '@angular/core';
import { SidebarComponent } from '../../resources/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard-admin',
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

}
