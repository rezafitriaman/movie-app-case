import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featured-movie-card',
  templateUrl: './featured-movie-card.component.html',
  styleUrls: ['./featured-movie-card.component.scss']
})
export class FeaturedMovieCardComponent implements OnChanges{
  @Input() featuredMovies!: Observable<MovieDetail[]>;
  @Input() title: string = '';

  show: {[key: string]: boolean} = {};
  charTruncateAfterNum: number = 200;

  ngOnChanges(changes: SimpleChanges): void {
    this.show = {};
  }
}