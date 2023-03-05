import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';
import { Subject, retry, takeUntil } from 'rxjs';
import { MovieSearch, NotFound, Search } from '../model/movie-search';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy{
  topTitle: string = config.topTitle;
  topGrossesTitle: string = config.topGrossesTitle;
  searchTitle: string = 'Search results:';
  topGrossesId: string[] = config.topGrossesId;
  topMovieIds: string[] = config.topMovieIds;
  topGrossesMovies: MovieDetail[] = [];
  topMovies: MovieDetail[] = [];
  searchMovie: Search[] = [];
  onSearchFieldfocus: string = '';
  isLoading: boolean = false;
  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(private movieService: MovieService, private searchService: SearchService) {
    this.getMovie(this.topMovieIds, this.topMovies);
    this.getMovie(this.topGrossesId, this.topGrossesMovies);
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

  OnEventType(type: 'focus') {
    this.onSearchFieldfocus = type;
  }

  onSearchInput(searchInputResult: string) {
    this.isLoading = true;
    this.movieService.getMovieBySearch(searchInputResult)
    .pipe(
      retry(3),
      takeUntil(this.componentDestroyed$)
    ).subscribe((result: MovieSearch | NotFound) => {
      this.isLoading = false;
      if(result.Response === 'False') {
        this.searchTitle = result.Error;
        this.searchMovie = [];
        return;
      }
      const search = (result as MovieSearch).Search;

      this.searchMovie = search.splice(0, search.length);
      this.searchTitle = 'Search results:';
    });
  }

  onClose() {
    this.onSearchFieldfocus = '';
    this.searchService.resetForm();
    this.searchService.toggleBackgroundToBlack(false);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}