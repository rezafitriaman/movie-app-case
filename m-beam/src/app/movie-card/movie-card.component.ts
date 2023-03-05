import { Component, Input } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Search } from '../model/movie-search';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movies: MovieDetail[] | Search[] = [];
  @Input() title: string = '';
}
