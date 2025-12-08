import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-left-panel-component',
  imports: [CommonModule],
  templateUrl: './left-panel-component.html',
  styleUrl: './left-panel-component.scss',
})
export class LeftPanelComponent {
listaDePeliculas: string[] = [
    'El Padrino',
    'Tiempos Violentos',
    'El Caballero de la Noche',
    'Forrest Gump',
    'Matrix'
  ];

  // Recibimos del padre cuál es el seleccionado actualmente (para el estilo CSS)
  @Input() seleccionActual: string | null = null;

  // Evento para avisar al padre que seleccionamos uno
  @Output() onItemSelect = new EventEmitter<string>();

  seleccionarItem(item: string) {
    this.onItemSelect.emit(item);
  }
}
