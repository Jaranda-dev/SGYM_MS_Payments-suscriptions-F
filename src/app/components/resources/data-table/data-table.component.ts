import { Component , Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() headers: string[] = []
  @Input() keys: string[] = [] 
  @Input() data: any[] = []

  @Output() onEdit = new EventEmitter<any>()
  @Output() onDelete = new EventEmitter<any>()
  @Output() onCreate = new EventEmitter<void>()  

  handleEdit(item: any) {
    this.onEdit.emit(item)
  }

  handleDelete(item: any) {
    this.onDelete.emit(item)
  }
   handleCreate() {
    this.onCreate.emit()
  }
  
// handleView(item: any) {
//   // Implement view logic if needed
//   // console.log('View item:', item)
// }
getValue(item: any, path: string) {
  return path.split('.').reduce((obj, key) => obj?.[key], item) ?? '';
}

}