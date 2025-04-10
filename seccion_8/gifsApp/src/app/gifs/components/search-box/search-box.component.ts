import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: false,
  template: `
    <div class="row">
      <h5 class="col s12">Buscar</h5>

      <div class="input-field col s12 m12">
        <input
          id="first_name"
          type="text"
          (keyup.enter)="searchTag()"
          #txtTagInput
        />
        <label for="first_name">Search</label>
      </div>
    </div>
  `,
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    // Clear the input field after searching
    this.tagInput.nativeElement.value = '';

    console.log(this.gifsService.tagsHistory);
  }
}
