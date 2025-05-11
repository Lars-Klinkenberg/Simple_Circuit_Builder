import { ComponentTypes } from './component-types';
import { Hole } from './hole';
import { Wire } from './wire';

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

  // sets the greater value of row or col as start and the lesser value as end
  // this is to ensure that the start is always less than the end
  setCoordinates(start: Hole, end: Hole): void {
    // create new coordinates to avoid mutating the original ones
    this.start = new Hole({ ...start.getCoordinate() });
    this.end = new Hole({ ...end.getCoordinate() });
  }

  getId(): string {
    return this.id;
  }

  abstract getType(): ComponentTypes;

  abstract toStorageItem(): StorageBoardElement;

  abstract fillFromJson(data: any): T;
}
