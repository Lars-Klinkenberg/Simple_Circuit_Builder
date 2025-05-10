import { Component } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { ColorSelectComponent } from './color-select/color-select.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export enum EditTypes {
  'Wire',
  'Component',
  'Delete',
}

@Component({
    selector: 'app-root',
    imports: [CommonModule, BoardComponent, ColorSelectComponent, MatIconModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  editTypes = EditTypes;
  currentEditType = this.editTypes.Wire;
  selectedColor: string = '#808080';

  changeEditType(tool: EditTypes) {
    this.currentEditType = tool;
  }
}
