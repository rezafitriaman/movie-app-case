import { Component, Input } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';

@Component({
  selector: 'app-featured-movie-card',
  templateUrl: './featured-movie-card.component.html',
  styleUrls: ['./featured-movie-card.component.scss']
})
export class FeaturedMovieCardComponent {
  @Input() featuredMovies: MovieDetail[] = [];
  @Input() title: string = '';

  show: {[key: string]: boolean} = {};
  charTruncateAfterNum: number = 200;
}