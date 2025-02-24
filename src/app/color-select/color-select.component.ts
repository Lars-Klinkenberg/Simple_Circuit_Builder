import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-color-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
  ],
  templateUrl: './color-select.component.html',
  styleUrl: './color-select.component.scss',
})
export class ColorSelectComponent {
  @Input() color: string = '#808080';
  @Output() colorChange = new EventEmitter<string>();

  changeSelectedColor(newColor: string) {
    this.color = newColor;
    this.colorChange.emit(this.color);
  }
}
