import { Component } from '@angular/core';
import { BoardComponent } from './components/board/board.component';
import { ColorSelectComponent } from './components/color-select/color-select.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ComponentTypes } from './models/component-types';
import { UserActions } from './models/user-actions';



@Component({
  selector: 'app-root',
  imports: [CommonModule, BoardComponent, ColorSelectComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  editTypes = ComponentTypes;
  userActions = UserActions;
  currentEditType = this.editTypes.WIRE;
  currentUserAction = this.userActions.ADD;
  selectedColor: string = '#808080';

  changeEditType(tool: ComponentTypes) {
    this.currentEditType = tool;
  }

  changeUserAction(action: UserActions) {
    this.currentUserAction = action;
  }
}
