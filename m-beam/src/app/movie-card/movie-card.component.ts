import { Component, Input } from '@angular/core';
import { Search } from '../model/search';
import { Observable } from 'rxjs';
import { MovieDetail } from '../model/movie-detail';
import { MovieSearch } from '../model/movie-search';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movies!: Observable<MovieDetail[] | Search[]>;
  @Input() title: string = '';
  @Input() isLoading: boolean = false;
}
