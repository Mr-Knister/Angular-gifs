import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  private gifs:Gif[] = [];

  private _tagsHistory:string[] = [];
  private apiKey:string = 'uX8qMz8vMPuZOQ6hGhUx2bnK8kE5vJo0';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
  }

  get tagHistory():string[] {
    return [...this._tagsHistory];
  }
  get gifList():Gif[] {
    return [...this.gifs];
  }

  private organizeHistory(tag:string):void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagHistory.splice(0, 10);
    this.saveLocalStorage();
    // this._tagsHistory.slice(0, 10);
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage():void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string):void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', tag)
      .set('limit', 10);

    this.http.get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(res => {
        this.gifs = res.data;
        // console.log({gifs: this.gifList});
      });

    // async searchTag(tag:string):Promise<void>
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=uX8qMz8vMPuZOQ6hGhUx2bnK8kE5vJo0&q=Valorant&limit=10')
    //   .then(resp => resp.json())
    //   .then(data => console.log(data));

    // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=uX8qMz8vMPuZOQ6hGhUx2bnK8kE5vJo0&p=Valorant&limit=10');
    // const data = await resp.json();
    // console.log(resp);



  }
}
