import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { MovieDetailSearch } from '../model/movie-detail-search';

@Component({
  selector: 'app-detail-movie-card',
  templateUrl: './detail-movie-card.component.html',
  styleUrls: ['./detail-movie-card.component.scss']
})
export class DetailMovieCardComponent implements OnChanges{
  @Input() moviesDetails: MovieDetail[] = [];
  @Input() moviesDetailSearch : MovieDetailSearch[] = []; 
  @Input() isLoading: boolean = false;
  @Input() title: string = '';

  show: {[key: string]: boolean} = {};
  charTruncateAfterNum: number = 200;

  constructor() {}
  getList(writer: string): string[] {
    return writer.split(',');
  }

  getImg(source: string): string {
    let img;

    switch (source) {
      case 'Internet Movie Database':
        img = '../assets/img/imdb_img.png';
        break;
      case 'Rotten Tomatoes':
        img = '../assets/img/rottentomatoes.png';
        break;
      case 'Metacritic':
        img = '../assets/img/metacritic.png';
        break;
      default:
        img = 'http://via.placeholder.com/60x60';
        break;
    }

    return img;
  }

  getRatingValue(value:string): string {
    return value.split('/')[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.show = {};
  }
}
