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
import { BoardElement } from '../../models/board-element';
import { ComponentTypes } from '../../models/component-types';
import { WireComponent } from '../wire/wire.component';
import { Hole } from '../../models/hole';

@Component({
  selector: 'app-board',
  imports: [CommonModule, WireComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements AfterViewInit {
  LOCAL_STORAGE_WIRE_PATH = 'wires';
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
  selectedHole: Coordinate | undefined = undefined;

  allComponents: BoardElement[] = [];
  availableComponentTypes = ComponentTypes;

  viewBox: string = '0 0 100 100';

  constructor() {
    this.allHoles = this.generateBoardHoles(this.rowCount(), this.colCount());
    this.allComponents.push(new Wire('red',this.allHoles[2], this.allHoles[82]));
    this.setViewBox();
  }

  ngAfterViewInit(): void {}

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
    console.log('holeSelected: ', hole);

    // 'console.log(`holeSelected: ${row}, ${col}`);

    // let selection: Coordinate = { x: row, y: col };

    // // If no hole is selected, select the current one
    // // don't select the same hole twice
    // if (!this.selectedHole || this.selectedHole == selection) {
    //   this.selectedHole = selection;
    //   return;
    // }

    // // If the selected hole is in the same row change selection to new hole
    // if (this.selectedHole.x == selection.x) {
    //   this.selectedHole = selection;
    //   return;
    // }

    // // create the wire
    // let wire = {
    //   start: this.selectedHole,
    //   end: selection,
    //   color: this.selectedColor(),
    // };

    // // this.wires.push(wire);
    // // this.renderWire(wire);
    // // this.saveWiresToStorage(this.'wires);
    // this.selectedHole = undefined;
  }

  calcHoleIdString(row: number, col: number) {
    return row + '-' + col;
  }

  renderWire(wire: Wire) {
    // Sort the wire coordinates to ensure the start is always less than the end
    // if (wire.start.row > wire.end.row) {
    //   let temp = wire.start;
    //   wire.start = wire.end;
    //   wire.end = temp;
    // }
    // let hole1Container = document.getElementById(
    //   this.calcHoleIdString(wire.start.row, wire.start.col)
    // );
    // let hole2Container = document.getElementById(
    //   this.calcHoleIdString(wire.end.row, wire.end.col)
    // );
    // if (!hole1Container || !hole2Container) return;
    // let hole1Position = hole1Container.getBoundingClientRect();
    // let hole2Position = hole2Container.getBoundingClientRect();
    // let wireHeight =
    //   Math.abs(hole1Position.top - hole2Position.top) + hole1Position.height;
    // let left = hole1Position.left;
    // let wireContainer = document.createElement('div');
    // wireContainer.style.position = 'absolute';
    // wireContainer.style.top = hole1Position.top.toString() + 'px';
    // wireContainer.style.left = left.toString() + 'px';
    // wireContainer.style.height = wireHeight.toString() + 'px';
    // wireContainer.classList.add('wire');
    // wireContainer.style.backgroundColor = wire.color;
    // this.boardContainer.nativeElement.appendChild(wireContainer);
  }

  saveWiresToStorage(wires: Wire[]) {
    localStorage.setItem(this.LOCAL_STORAGE_WIRE_PATH, JSON.stringify(wires));
  }

  loadWiresFromStorage(): Wire[] {
    let storage = localStorage.getItem(this.LOCAL_STORAGE_WIRE_PATH);
    if (!storage) return [];

    let wires: Wire[] = JSON.parse(storage);
    if (!wires) return [];

    return wires;
  }

  asWire(element: BoardElement): Wire {
    return element as Wire;
  }
}
