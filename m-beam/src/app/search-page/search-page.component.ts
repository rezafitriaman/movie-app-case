import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MovieSearch, Search } from '../model/movie-search';
import { SearchService } from '../services/search.service';
import { Plot } from '../model/plot';
import { MovieDetailSearch } from '../model/movie-detail-search';

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
  searchMoviesWithPlot: MovieDetailSearch[] = [];
  onSearchFieldfocus: string = '';
  isLoading: boolean = false;
  componentDestroyed$: Subject<boolean> = new Subject();
  getMovieBySearch: Observable<MovieSearch> | Observable<MovieSearch | { Search: Observable<MovieDetailSearch[]>; totalResults: string; Response: string; Error: string}> = new Observable<MovieSearch>;

  constructor(private movieService: MovieService, private searchService: SearchService) {
    this.getMoviesByIds(this.topMovieIds, this.topMovies);
    this.getMoviesByIds(this.topGrossesId, this.topGrossesMovies);
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
  }

  getMoviesByIds(ids: string[], movies: MovieDetail[]): void {
    ids.forEach(id => {
      this.movieService.getMovieById(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(movie => movies.push(movie));  
    });
  }

  OnFocusEvent(type: 'focus'): void {
    this.onSearchFieldfocus = type;
  }

  onSearchInput(searchInputResult: {searchResult: string; selectedSearchByOption: string; selectedPlotOption: Plot;}): void {
    // if search result is empty then dont send the request
    if(searchInputResult.searchResult === null || searchInputResult.searchResult === '') return;

    this.isLoading = true;
    this.searchTitle = `Search results: ${searchInputResult.searchResult}`;

    switch (searchInputResult.selectedSearchByOption) {
      case 'plot':
        this.getMovieBySearch = this.movieService.getMovieBySearchwithPlot(searchInputResult);
        break;
      case 'title':
        this.getMovieBySearch = this.movieService.getMovieBySearch(searchInputResult.searchResult);
        break;
    }

    this.getMovieBySearch.subscribe((result) => {
      this.searchMovie = [];
      this.searchMoviesWithPlot = [];
      this.isLoading = false;

      if(result.Response === 'False') {
        this.setSearchTitle(result.Error);
        return;
      }

      if(result.Search instanceof Observable) {
          const movies = result.Search as Observable<MovieDetailSearch[]>;
          movies.subscribe((movie: MovieDetailSearch[]) => this.searchMoviesWithPlot = movie.slice(0, 5));
          return;
      }

      const search = (result as MovieSearch).Search;

      this.searchMovie = search.slice(0, 5);
    })
  }

  setSearchTitle(responseText: string): void {
    this.searchTitle = responseText;
  }

  onClose(): void {
    this.onSearchFieldfocus = '';
    this.searchService.resetForm();
    this.searchService.toggleBackgroundToBlack(false);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}