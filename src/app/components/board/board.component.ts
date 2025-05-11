import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Wire } from '../../models/wire';
import { Coordinate } from '../../models/coordinate';
import { input } from '@angular/core';
import { BoardElement, StorageBoardElement } from '../../models/board-element';
import { ComponentTypes } from '../../models/component-types';
import { Hole } from '../../models/hole';

@Component({
  selector: 'app-board',
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements AfterViewInit {
  LOCAL_STORAGE_COMPONENT_PATH = 'components';
  BOARD_OPTIONS = {
    verticalSpacing: 50,
    horizontalSpacing: 50,
    holeSize: 10,
    stripeHeight: 26,
  };

  // @ViewChild('board') boardContainer!: ElementRef;

  rowCount = input<number>(15);
  colCount = input<number>(40);
  selectedColor = input<string>('grey');

  allHoles: Hole[] = [];
  selectedHole: Hole | undefined = undefined;

  allComponents: BoardElement<any>[] = [];
  availableComponentTypes = ComponentTypes;

  viewBox: string = '0 0 100 100';

  constructor() {
    this.allHoles = this.generateBoardHoles(this.rowCount(), this.colCount());
    this.setViewBox();
  }

  ngAfterViewInit(): void {
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
      Math.max(...this.allHoles.map((h) => h.getCoordinate().x)) + padding;
    const maxY =
      Math.max(...this.allHoles.map((h) => h.getCoordinate().y)) + padding;

    const width = maxX - minX;
    const height = maxY - minY;

    this.viewBox = `${minX} ${minY} ${width} ${height}`;
  }

  holeSelected(hole: Hole) {
    if (!this.selectedHole) {
      this.selectedHole = hole;
      return;
    }

    if (this.selectedHole === hole) {
      return;
    }

    let wire = new Wire(
      this.selectedColor(),
      this.selectedHole,
      hole,
      this.BOARD_OPTIONS.holeSize
    );
    this.selectedHole = undefined;
    this.createComponent(wire);
  }

  createComponent(component: BoardElement<any>, updateStorage: boolean = true) {
    this.allComponents.push(component);
    this.saveComponentsToStorage(this.allComponents);
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
        default: {
          console.error("couldn't create component: ", component);
        }
      }
    });
  }

  asWire(element: BoardElement<any>): Wire {
    return element as Wire;
  }
}
