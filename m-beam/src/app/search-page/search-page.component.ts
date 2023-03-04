import { Component } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent {
  topTitle: string = config.topTitle;
  topGrossesTitle: string = config.topGrossesTitle;
  topGrossesId: string[] = config.topGrossesId;
  topGrossesMovies: MovieDetail[] = [];
  topMovieIds: Array<string> = config.topMovieIds;
  topMovies: MovieDetail[] = [];

  constructor(private movieService: MovieService) {
    this.getMovie(this.topMovieIds, this.topMovies);
    this.getMovie(this.topGrossesId, this.topGrossesMovies);
  }

  getMovie(ids: string[], movies: MovieDetail[]): void {
    ids.forEach(id => {
      this.movieService.getMovieById(id)
      .subscribe(movie => movies.push(movie));  
    });
  }
}
