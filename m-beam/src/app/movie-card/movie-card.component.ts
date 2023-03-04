import { Component, Input } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movies: MovieDetail[] = [];
  @Input() title: string = '';
}
