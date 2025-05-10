import { BoardElement } from './board-element';
import { ComponentTypes } from './component-types';
import { Coordinate } from './coordinate';

export class Wire extends BoardElement {
  constructor(color: string, start: Coordinate, end: Coordinate) {
    super(color, start, end);
  }

  override getType(): ComponentTypes {
    return ComponentTypes.WIRE;
  }
}
