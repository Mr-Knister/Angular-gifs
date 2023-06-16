import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent {

  constructor(private gifsService: GifsService) {}

  get gifs():Gif[] {
    return this.gifsService.gifList;
  }
}
