import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'gifs-card',
  standalone: false,
  template: `
    <div class="card grey darken-4 white-text">
      <div class="card-image">
        <shared-lazy-image
          [url]="gif.images.downsized.url"
          [alt]="gif.title || 'No name'"
        ></shared-lazy-image>
        <!-- <img [src]="gif.images.downsized.url" /> -->
      </div>
      <div class="card-content">
        @if (gif.title) {
        <span class="card-title">{{ gif.title }}</span>
        } @else {
        <span class="card-title">No title</span>
        }
      </div>
    </div>
  `,
  styles: [
    `
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .card {
        width: 250px;
      }
    `,
  ],
})
export class CardComponent implements OnInit {
  @Input()
  public gif!: Gif;

  constructor() {}

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif property is required');
  }
}
