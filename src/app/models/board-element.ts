import { ComponentTypes } from './component-types';
import { Coordinate } from './coordinate';

export abstract class BoardElement {
  private id: string;
  private start!: Coordinate;
  private end!: Coordinate;
  color: string;

  constructor(color: string, start: Coordinate, end: Coordinate) {
    this.id = crypto.randomUUID();
    this.color = color;
    this.setCoordinates(start, end);
  }

  setStart(start: Coordinate): void {
    this.setCoordinates(start, this.end);
  }

  getStart(): Coordinate {
    return this.start;
  }

  getEnd(): Coordinate {
    return this.end;
  }

  setEnd(end: Coordinate): void {
    this.setCoordinates(this.start, end);
  }

  // sets the greater value of row or col as start and the lesser value as end
  // this is to ensure that the start is always less than the end
  setCoordinates(start: Coordinate, end: Coordinate): void {
    let startCoordinate = start;
    let endCoordinate = end;

    // if end row is greater than start row, swap them
    if (start.row < end.row) {
      startCoordinate.row = end.row;
      endCoordinate.row = start.row;
    }

    // if end col is greater than start col, swap them
    if (start.col < end.col) {
      startCoordinate.col = end.col;
      endCoordinate.col = start.col;
    }

    this.start = startCoordinate;
    this.end = endCoordinate;
  }

  getId(): string {
    return this.id;
  }

  abstract getType(): ComponentTypes;
}
