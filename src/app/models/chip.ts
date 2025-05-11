import { BoardElement, StorageBoardElement } from './board-element';
import { ComponentTypes } from './component-types';
import { Hole } from './hole';

export class Chip extends BoardElement<Chip> {
  override getType(): ComponentTypes {
    return ComponentTypes.CHIP;
  }

  override toStorageItem(): StorageBoardElement {
    return {
      type: ComponentTypes.CHIP,
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

  override fillFromJson(data: StorageBoardElement): Chip {
    this.color = data.element?.color;
    this.setStart(new Hole(data.element?.start));
    this.setEnd(new Hole(data.element?.end));
    return this;
  }
}
