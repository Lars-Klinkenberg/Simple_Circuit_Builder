import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ColorSelectComponent } from './color-select/color-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BoardComponent, ColorSelectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'simple_circuit_builder';
  selectedColor: string = '#808080';
}
