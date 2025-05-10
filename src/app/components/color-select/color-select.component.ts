import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface Color {
  name: string;
  hexCode: string;
}

@Component({
    selector: 'app-color-select',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        CommonModule,
    ],
    templateUrl: './color-select.component.html',
    styleUrl: './color-select.component.scss'
})
export class ColorSelectComponent {
  @Input() color: string = '#808080';
  @Output() colorChange = new EventEmitter<string>();

  changeSelectedColor(newColor: string) {
    this.color = newColor;
    this.colorChange.emit(this.color);
  }

  // hexCodes should be 6 chars long so it can be displayed in the input
  defaultColors: Color[] = [
    {
      name: 'red',
      hexCode: '#ff0000',
    },
    {
      name: 'blue',
      hexCode: '#0000ff',
    },
    {
      name: 'black',
      hexCode: '#000000',
    },
    {
      name: 'white',
      hexCode: '#ffffff',
    },
    {
      name: 'green',
      hexCode: '#008000',
    },
    {
      name: 'yellow',
      hexCode: '#ffff00',
    },
    {
      name: 'orange',
      hexCode: '#ffa500',
    },
    {
      name: 'gray',
      hexCode: '#808080',
    },
    {
      name: 'purple',
      hexCode: '#800080',
    },
  ];
}
