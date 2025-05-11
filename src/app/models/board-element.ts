import { ComponentTypes } from './component-types';
import { Hole } from './hole';

export interface StorageBoardElement {
  type: ComponentTypes;
  element: any;
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

  setCoordinates(start: Hole, end: Hole): void {
    // create new coordinates to avoid mutating the original ones
    this.start = new Hole({ ...start.getCoordinate() });
    this.end = new Hole({ ...end.getCoordinate() });
  }

  getId(): string {
    return this.id;
  }

  toStorageItem(): StorageBoardElement {
    return {
      type: this.getType(),
      element: {
        start: {
          x: this.getStart().getCoordinate().x,
          y: this.getStart().getCoordinate().y,
        },
        end: {
          x: this.getEnd().getCoordinate().x,
          y: this.getEnd().getCoordinate().y,
        },
        color: this.color,
      },
    };
  }

  abstract getType(): ComponentTypes;

  abstract fillFromJson(data: any): T;
}
