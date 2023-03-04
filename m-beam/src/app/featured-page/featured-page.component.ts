import { Component } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { config } from '../config';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-featured-page',
  templateUrl: './featured-page.component.html',
  styleUrls: ['./featured-page.component.scss']
})
export class FeaturedPageComponent {
  featuredTitle: string = config.featuredTitle;
  topTitle: string = config.topTitle;
  featuredMoviesIds: Array<string> = config.featuredMoviesIds;
  topMovieIds: Array<string> = config.topMovieIds;
  featuredMovies: MovieDetail[] = [];
  topMovies: MovieDetail[] = [];

  constructor(private movieService: MovieService) {
    this.getMovie(this.featuredMoviesIds, this.featuredMovies);
    this.getMovie(this.topMovieIds, this.topMovies);
  }

  getMovie(ids: string[], movies: MovieDetail[]): void {
    ids.forEach(id => {
      this.movieService.getMovieById(id)
      .subscribe(movie => movies.push(movie));  
    });
  }
}
