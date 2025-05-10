import { Component, input } from '@angular/core';
import { Wire } from '../../models/wire';

@Component({
  selector: 'wire',
  imports: [],
  templateUrl: './wire.component.html',
  styleUrl: './wire.component.scss'
})
export class WireComponent {
  data = input<Wire>();
}
