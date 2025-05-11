import { BoardElement, StorageBoardElement } from './board-element';
import { ComponentTypes } from './component-types';
import { Hole } from './hole';

export class Wire extends BoardElement<Wire> {
  strokeWidth: number;
  constructor(color: string, start: Hole, end: Hole, strokeWidth: number = 10) {
    super(color, start, end);
    this.strokeWidth = strokeWidth;
  }

  override getType(): ComponentTypes {
    return ComponentTypes.WIRE;
  }

  override toStorageItem(): StorageBoardElement {
    return {
      type: ComponentTypes.WIRE,
      element: {
        start: {
          x: this.getStart().getCoordinate().x,
          y: this.getStart().getCoordinate().y,
        },
        end: {
          x: this.getEnd().getCoordinate().x,
          y: this.getEnd().getCoordinate().y,
        },
        strokeWidth: this.strokeWidth,
        color: this.color,
      },
    };
  }

  override fillFromJson(data: StorageBoardElement): Wire {
    this.color = data.element?.color;
    this.strokeWidth = data.element?.strokeWidth;
    this.setStart(new Hole(data.element?.start));
    this.setEnd(new Hole(data.element?.end));
    return this;
  }
}
