import { Component, Input, OnInit } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  standalone: false,
})
export class ListComponent {
  @Input()
  public characterList: Character[] = [{ name: 'Trunks', power: 10 }];
}
