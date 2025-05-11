import { Component, input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Wire } from '../../models/wire';

@Component({
  selector: 'wire',
  imports: [],
  templateUrl: './wire.component.html',
  styleUrl: './wire.component.scss',
  // schemas: [NO_ERRORS_SCHEMA]
})
export class WireComponent {
  data = input<Wire>();
}
