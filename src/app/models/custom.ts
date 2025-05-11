import { BoardElement, StorageBoardElement } from './board-element';
import { ComponentTypes } from './component-types';
import { Hole } from './hole';

export class Custom extends BoardElement<Custom> {
  override getType(): ComponentTypes {
    return ComponentTypes.CUSTOM;
  }

  fillFromJson(data: StorageBoardElement): Custom {
    this.color = data.element?.color;
    this.setStart(new Hole(data.element?.start));
    this.setEnd(new Hole(data.element?.end));
    return this;
  }
}
