import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-toast',
  imports: [CommonModule],
  templateUrl: './message-toast.component.html',
  styleUrl: './message-toast.component.css'
})
export class MessageToastComponent implements OnInit {
  @Input() message: string = ''
  @Input() type: 'success' | 'error' = 'success'
  @Input() duration: number = 3000 // milisegundos

  visible = true

  ngOnInit() {
    setTimeout(() => {
      this.visible = false
    }, this.duration)
  }
  
}
