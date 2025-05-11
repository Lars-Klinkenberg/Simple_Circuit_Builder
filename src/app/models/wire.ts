import { BoardElement } from './board-element';
import { ComponentTypes } from './component-types';
import { Hole } from './hole';

export class Wire extends BoardElement {
  strokeWidth: number;
  constructor(color: string, start: Hole, end: Hole, strokeWidth: number = 10) {
    super(color, start, end);
    this.strokeWidth = strokeWidth;
  }

  override getType(): ComponentTypes {
    return ComponentTypes.WIRE;
  }
}
