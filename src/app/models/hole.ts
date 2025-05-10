import { Coordinate } from "./coordinate";

export class Hole {
  private id: string;
  coordinate : Coordinate;

  constructor(coordinate: Coordinate) {
    this.id = crypto.randomUUID();
    this.coordinate = coordinate;
  }
}
