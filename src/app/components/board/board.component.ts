import { CommonModule } from '@angular/common';
import { Wire } from '../../models/wire';
import { input, Component } from '@angular/core';
import { BoardElement, StorageBoardElement } from '../../models/board-element';
import { ComponentTypes } from '../../models/component-types';
import { Hole } from '../../models/hole';
import { UserActions } from '../../models/user-actions';
import { Custom } from '../../models/custom';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  LOCAL_STORAGE_COMPONENT_PATH = 'components';
  BOARD_OPTIONS = {
    verticalSpacing: 70,
    horizontalSpacing: 50,
    holeSize: 20,
    stripeHeight: 50,
    holeHorizontalOffset: 30,
    stripeVerticalOffset: 30,
  };
  allEditModes = UserActions;

  rowCount = input<number>(15);
  colCount = input<number>(40);
  selectedColor = input<string>('grey');
  currentEditMode = input<UserActions>(UserActions.ADD); // decides how the user interacts with the board
  selectedComponentType = input<ComponentTypes>(ComponentTypes.WIRE); // if user is adding a component, this is the type of component to add

  allHoles: Hole[] = [];
  selectedHole: Hole | undefined = undefined;

  allComponents: BoardElement<any>[] = [];
  availableComponentTypes = ComponentTypes;

  viewBox: string = '0 0 100 100';

  constructor() {
    this.allHoles = this.generateBoardHoles(this.rowCount(), this.colCount());
    this.setViewBox();
    this.loadComponentsFromStorage();
  }

  generateBoardHoles(rows: number, cols: number) {
    let holes: Hole[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let hole: Hole = new Hole({
          x: col * this.BOARD_OPTIONS.horizontalSpacing,
          y: row * this.BOARD_OPTIONS.verticalSpacing,
        });

        hole.setX(
          hole.getCoordinate().x + this.BOARD_OPTIONS.holeHorizontalOffset
        );
        hole.setY(
          hole.getCoordinate().y + this.BOARD_OPTIONS.stripeVerticalOffset
        );
        holes.push(hole);
      }
    }

    return holes;
  }

  setViewBox(padding: number = 10) {
    const minX =
      Math.min(...this.allHoles.map((h) => h.getCoordinate().x)) - padding;
    const minY =
      Math.min(...this.allHoles.map((h) => h.getCoordinate().y)) - padding;
    const maxX =
      Math.max(...this.allHoles.map((h) => h.getCoordinate().x));
    const maxY =
      Math.max(...this.allHoles.map((h) => h.getCoordinate().y)) + padding + 10;

    const width = maxX - minX;
    const height = maxY - minY;

    this.viewBox = `0 0 ${
      width + this.BOARD_OPTIONS.holeHorizontalOffset * 2
    } ${height + this.BOARD_OPTIONS.stripeVerticalOffset}`;
  }

  holeSelected(hole: Hole) {
    if (this.currentEditMode() !== UserActions.ADD) {
      return;
    }

    if (this.selectedHole === hole) {
      this.selectedHole = undefined;
      return;
    }

    if (!this.selectedHole) {
      this.selectedHole = hole;
      return;
    }

    switch (this.selectedComponentType()) {
      case ComponentTypes.WIRE: {
        let wire = new Wire(
          this.selectedColor(),
          this.selectedHole,
          hole,
          this.BOARD_OPTIONS.holeSize
        );
        this.selectedHole = undefined;
        this.createComponent(wire);
        break;
      }
      case ComponentTypes.CUSTOM: {
        let custom = new Custom(this.selectedColor(), this.selectedHole, hole);
        this.selectedHole = undefined;
        this.createComponent(custom);
        break;
      }
      default: {
        console.error('unknown component type');
        return;
      }
    }
  }

  createComponent(component: BoardElement<any>, updateStorage: boolean = true) {
    this.allComponents.push(component);
    this.saveComponentsToStorage(this.allComponents);
  }

  deleteComponent(component: BoardElement<any>) {
    if (this.currentEditMode() !== UserActions.REMOVE) {
      return;
    }

    this.allComponents = this.allComponents.filter(
      (c) => c.getId() !== component.getId()
    );
    this.saveComponentsToStorage(this.allComponents);
  }

  handleComponentClick(component: BoardElement<any>) {
    if (this.currentEditMode() === UserActions.REMOVE) {
      this.deleteComponent(component);
      return;
    }
    if (this.currentEditMode() === UserActions.ADD) {
      return;
    }
  }

  saveComponentsToStorage(components: BoardElement<any>[]) {
    let storageComponents: StorageBoardElement[] = [];
    this.allComponents.forEach((component) => {
      storageComponents.push(component.toStorageItem());
    });
    localStorage.setItem(
      this.LOCAL_STORAGE_COMPONENT_PATH,
      JSON.stringify(storageComponents)
    );
  }

  loadComponentsFromStorage() {
    console.log('loadComponentsFromStorage');

    const storageComponents = localStorage.getItem(
      this.LOCAL_STORAGE_COMPONENT_PATH
    );

    console.log('storageComponents', storageComponents);

    if (!storageComponents) {
      return;
    }

    const loadedComponents: StorageBoardElement[] =
      JSON.parse(storageComponents);
    console.log('loadedComponents', loadedComponents);

    loadedComponents.forEach((component) => {
      switch (component.type) {
        case ComponentTypes.WIRE: {
          let wire = new Wire(
            this.selectedColor(),
            new Hole({ x: 0, y: 0 }),
            new Hole({ x: 0, y: 0 }),
            this.BOARD_OPTIONS.holeSize
          );
          this.createComponent(wire.fillFromJson(component));
          break;
        }
        case ComponentTypes.CUSTOM: {
          let custom = new Custom(
            this.selectedColor(),
            new Hole({ x: 0, y: 0 }),
            new Hole({ x: 0, y: 0 })
          );
          this.createComponent(custom.fillFromJson(component));
          break;
        }
        default: {
          console.error("couldn't create component: ", component);
        }
      }
    });
  }

  asWire(element: BoardElement<any>): Wire {
    return element as Wire;
  }

  asCustom(element: BoardElement<any>): Custom {
    return element as Custom;
  }

  absDistance(a: number, b: number): number {
    return Math.abs(a - b);
  }

  getStripeY(index: number): number {
    let y =
      index * this.BOARD_OPTIONS.verticalSpacing -
      (this.BOARD_OPTIONS.stripeHeight - this.BOARD_OPTIONS.holeSize) +
      4;
    return y + this.BOARD_OPTIONS.stripeVerticalOffset;
  }
}
