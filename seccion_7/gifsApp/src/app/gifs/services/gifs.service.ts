import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interface/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];

  private service_url = 'https://api.giphy.com/v1/gifs';
  private api_key = 'Wh97aSFh0g0pTtdiVIUr2iMBxtomq8tg';

  public gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);

    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (!tag || tag.length === 0) return;

    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.service_url}/search`, { params })
      .subscribe((response) => {
        this.gifsList = response.data;
      });
  }
}
