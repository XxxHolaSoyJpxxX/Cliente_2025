import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-right-panel-component',
  imports: [CommonModule],
  templateUrl: './right-panel-component.html',
  styleUrl: './right-panel-component.scss',
})
export class RightPanelComponent {
  @Input() itemDetalle: string | null = null; 

  @Output() onClear = new EventEmitter<void>();

  limpiar() {
    this.onClear.emit();
  }
}
