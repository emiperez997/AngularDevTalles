import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  standalone: false,
})
export class ListComponent {
  @Input()
  public characterList: Character[] = [];

  @Output()
  public selectedCharacter: EventEmitter<string> = new EventEmitter();

  onDeleteCharacter(id: string): void {
    this.selectedCharacter.emit(id);
  }
}
