import { Component, Input } from '@angular/core';
import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input()
  public gif!: Gif;

  constructor() {}
}
