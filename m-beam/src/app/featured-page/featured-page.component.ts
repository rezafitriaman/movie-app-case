import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { config } from '../config';
import { MovieService } from '../services/movie.service';
import { Subject, takeUntil } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-featured-page',
  templateUrl: './featured-page.component.html',
  styleUrls: ['./featured-page.component.scss']
})
export class FeaturedPageComponent implements OnInit, OnDestroy{
  featuredTitle: string = config.featuredTitle;
  topTitle: string = config.topTitle;
  featuredMoviesIds: Array<string> = config.featuredMoviesIds;
  topMovieIds: Array<string> = config.topMovieIds;
  featuredMovies: MovieDetail[] = [];
  topMovies: MovieDetail[] = [];
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private movieService: MovieService, private searchService: SearchService) {
    this.getMovie(this.featuredMoviesIds, this.featuredMovies);
    this.getMovie(this.topMovieIds, this.topMovies);
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
  }

  getMovie(ids: string[], movies: MovieDetail[]): void {
    ids.forEach(id => {
      this.movieService.getMovieById(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(movie => movies.push(movie));  
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
