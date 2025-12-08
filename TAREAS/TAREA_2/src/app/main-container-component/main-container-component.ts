import { Component } from '@angular/core';
import { RightPanelComponent } from './right-panel-component/right-panel-component';
import { LeftPanelComponent } from './left-panel-component/left-panel-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-container-component',
  standalone: true,
  imports: [
    CommonModule,
    LeftPanelComponent, 
    RightPanelComponent
   ],
  templateUrl: './main-container-component.html',
  styleUrl: './main-container-component.scss',
})
export class MainContainerComponent {
itemSeleccionado: string | null = null;

  recibirSeleccion(item: string) {
    this.itemSeleccionado = item;
  }
  limpiarSeleccion() {
    this.itemSeleccionado = null;
  }
}
