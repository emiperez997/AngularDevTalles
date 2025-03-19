import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent {
  public name: string = 'captain america';
  public age: number = 35;

  // Get se usa como una propiedad, no como un método
  get capitalizedName(): string {
    return this.name.toUpperCase();
  }

  // Se usa el método para obtener el valor
  getheroDescription(): string {
    return `${this.name} - ${this.age}`;
  }

  changeName(): void {
    this.name = 'ironman';
  }

  changeAge(): void {
    this.age = 45;
  }

  reset(): void {
    this.name = 'captain america';
    this.age = 35;
  }
}
