import { ComponentTypes } from './component-types';
import { Hole } from './hole';
import { Wire } from './wire';

export interface StorageBoardElement{
  type: ComponentTypes,
  element: any
}

export abstract class BoardElement<T> {
  private id: string;
  private start!: Hole;
  private end!: Hole;
  color: string;

  constructor(color: string, start: Hole, end: Hole) {
    this.id = crypto.randomUUID();
    this.color = color;
    this.setCoordinates(start, end);
  }

  setStart(start: Hole): void {
    this.setCoordinates(start, this.end);
  }

  getStart(): Hole {
    return this.start;
  }

  getEnd(): Hole {
    return this.end;
  }

  setEnd(end: Hole): void {
    this.setCoordinates(this.start, end);
  }

  // sets the greater value of row or col as start and the lesser value as end
  // this is to ensure that the start is always less than the end
  setCoordinates(start: Hole, end: Hole): void {
    // create new coordinates to avoid mutating the original ones
    let startCoordinate = new Hole({... start.getCoordinate()});
    let endCoordinate = new Hole({... end.getCoordinate()});

    // if end row is greater than start row, swap them
    if (start.getCoordinate().x < end.getCoordinate().x) {
      startCoordinate.getCoordinate().x = end.getCoordinate().x;
      endCoordinate.getCoordinate().x = start.getCoordinate().x;
    }

    // if end col is greater than start col, swap them
    if (start.getCoordinate().y < end.getCoordinate().y) {
      startCoordinate.getCoordinate().y = end.getCoordinate().y;
      endCoordinate.getCoordinate().y = start.getCoordinate().y;
    }

    this.start = startCoordinate;
    this.end = endCoordinate;
  }

  getId(): string {
    return this.id;
  }

  abstract getType(): ComponentTypes;

  abstract toStorageItem():StorageBoardElement;

  abstract fillFromJson(data: any): T;
}
