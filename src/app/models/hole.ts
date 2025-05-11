import { Coordinate } from './coordinate';

export class Hole {
  private id: string;
  private coordinate: Coordinate;

  constructor(coordinate: Coordinate) {
    this.id = crypto.randomUUID();
    this.coordinate = coordinate;
  }

  getCoordinate(): Coordinate {
    return this.coordinate;
  }

  setCoordinate(coordinate: Coordinate): void {
    this.coordinate = coordinate;
  }

  setX(x: number): void {
    this.coordinate.x = x;
  }
  setY(y: number): void {
    this.coordinate.y = y;
  }
}
