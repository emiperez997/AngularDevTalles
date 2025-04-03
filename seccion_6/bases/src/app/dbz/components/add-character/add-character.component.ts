import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  standalone: false,
})
export class AddCharacterComponent {
  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    id: '',
    name: '',
    power: 0,
  };

  emitCharacter(): void {
    console.log(this.character);

    if (this.character.name.trim().length === 0) return;

    this.onNewCharacter.emit({ ...this.character });

    // Limpiar el formulario
    this.character = {
      id: '',
      name: '',
      power: 0,
    };
  }
}
