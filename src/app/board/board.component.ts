import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';

export interface Wire {
  start: Coordinate;
  end: Coordinate;
  color: string;
}
export interface Coordinate {
  row: number;
  col: number;
}

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  @ViewChild('board') boardContainer!: ElementRef;

  @Input() rowCount: number = 15;
  @Input() colCount: number = 40;
  @Input() selectedColor: string = "grey"

  selectedHole: Coordinate | undefined = undefined;

  wires: Wire[] = [];

  holeSelected(row: number, col: number) {
    let selection: Coordinate = { row, col };

    if (!this.selectedHole || this.selectedHole == selection) {
      this.selectedHole = selection;
      return;
    }
    let wire = { start: this.selectedHole, end: selection, color: this.selectedColor };
    this.wires.push(wire);
    this.renderWire(wire);
    this.selectedHole = undefined;
  }

  calcHoleIdString(row: number, col: number) {
    return row + '-' + col;
  }

  renderWire(wire: Wire) {
    if (wire.start.row > wire.end.row) {
      let temp = wire.start;
      wire.start = wire.end;
      wire.end = temp;
    }

    let hole1Container = document.getElementById(
      this.calcHoleIdString(wire.start.row, wire.start.col)
    );
    let hole2Container = document.getElementById(
      this.calcHoleIdString(wire.end.row, wire.end.col)
    );

    if (!hole1Container || !hole2Container) return;
    let hole1Position = hole1Container.getBoundingClientRect();
    let hole2Position = hole2Container.getBoundingClientRect();

    let wireHeight =
      Math.abs(hole1Position.top - hole2Position.top) + hole1Position.height;
    let left = hole1Position.left;
    let wireContainer = document.createElement('div');
    wireContainer.style.position = 'absolute';
    wireContainer.style.top = hole1Position.top.toString() + 'px';
    wireContainer.style.left = left.toString() + 'px';
    wireContainer.style.height = wireHeight.toString() + 'px';
    wireContainer.classList.add('wire');
    wireContainer.style.backgroundColor = wire.color;
    this.boardContainer.nativeElement.appendChild(wireContainer);
  }
}
