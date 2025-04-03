import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <h3>
      {{ counter }}
    </h3>

    <button class="btn btn-primary mx-2" (click)="increaseBy(+1)">+1</button>
    <button class="btn btn-danger mx-2" (click)="reset()">Reset</button>
    <button class="btn btn-primary mx-2" (click)="increaseBy(-1)">-1</button>
  `,
  standalone: false,
})
export class CounterComponent {
  public counter: number = 10;

  increaseBy(value: number): void {
    this.counter += value;
  }

  reset(): void {
    this.counter = 10;
  }
}
