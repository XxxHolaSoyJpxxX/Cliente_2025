import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainContainerComponent } from "./main-container-component/main-container-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Tarea2');
}
