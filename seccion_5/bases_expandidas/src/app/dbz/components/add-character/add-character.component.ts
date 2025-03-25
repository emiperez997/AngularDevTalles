import { Component, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  standalone: false,
})
export class AddCharacterComponent {
  public character: Character = {
    name: '',
    power: 0,
  };

  emitCharacter(): void {
    console.log(this.character);
  }
}
