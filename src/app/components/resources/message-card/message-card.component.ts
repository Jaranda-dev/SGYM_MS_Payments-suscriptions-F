import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-message-card',
  imports: [],
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.css'
})
export class MessageCardComponent {
 @Input() message: string = '';
  @Input() title: string = '';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  onConfirm() {
    this.confirm.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
