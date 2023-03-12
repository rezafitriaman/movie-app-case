import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, map, takeUntil, timer } from 'rxjs';
import { MovieSearch, MovieSearchPlot } from '../model/movie-search';
import { SearchService } from '../services/search.service';
import { Plot } from '../model/plot';
import { MovieDetailSearch } from '../model/movie-detail-search';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../model/search';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit, OnDestroy{
  // titles
  firstListMovieTitle: string = config.firstListMovies.title;
  secondListMovieTitle: string = config.secondListMovies.title;
  searchTitle: string = 'Search results:';

  // count serve movie
  countToServe: number = config.countListsToServe; 

  // movies
  firstListMovies: MovieDetail[] = [];
  secondListMovies: MovieDetail[] = [];

  // search movies
  searchMovies: Search[] = [];
  searchMoviesWithPlot: MovieDetailSearch[] = [];

  // loading
  listMoviesIsLoaded: boolean = false;
  isLoadingSearchMovie: boolean = false;

  // event
  onFocusSearchField: string = '';

  // observable
  componentDestroyed$: Subject<boolean> = new Subject();
  getMovieBySearch$: Observable<MovieSearch | MovieSearchPlot> = new Observable();
  listsMovies$: Observable<{firstListMovies: MovieDetail[], secondListMovies: MovieDetail[]}> = new Observable();

  constructor(private movieService: MovieService, private searchService: SearchService, private route: ActivatedRoute) {
    this.listsMovies$ = this.route.data.pipe(map(data => data['movies']));
  
    this.listsMovies$
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(({firstListMovies, secondListMovies}: {firstListMovies: MovieDetail[], secondListMovies: MovieDetail[]})=> {
      this.firstListMovies = firstListMovies;
      this.secondListMovies = secondListMovies;
      
      timer(300)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(_ => {
        this.listMoviesIsLoaded = true;
      });


      this.movieService.isLoadingRoute.next(false);
    })
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
  }

  OnFocusEvent(type: 'focus'): void {
    this.onFocusSearchField = type;
  }

  onSearchInput(searchInputResult: {searchResult: string; selectedSearchByOption: string; selectedPlotOption: Plot;}): void {
    // if search result is empty then dont send the request
    if(searchInputResult.searchResult === null || searchInputResult.searchResult === '') return;

    this.isLoadingSearchMovie = true;
    this.searchTitle = `Search results: ${searchInputResult.searchResult}`;

    // switch search mode
    switch (searchInputResult.selectedSearchByOption) {
      case 'plot':
        this.getMovieBySearch$ = this.movieService.getMovieBySearchwithPlot(searchInputResult)
        break;
      case 'title':
        this.getMovieBySearch$ = this.movieService.getMovieBySearch(searchInputResult.searchResult)
        break;
    }

    this.getMovieBySearch$
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((result) => {
      this.searchMovies = [];
      this.searchMoviesWithPlot = [];
      this.isLoadingSearchMovie = false;

      if(result.Response === 'False') {
        this.searchTitle = result.Error;
        return;
      }

      if(result.Search instanceof Observable) {
          const movies = result.Search as Observable<MovieDetailSearch[]>;
          movies.subscribe((movie: MovieDetailSearch[]) => this.searchMoviesWithPlot = movie.slice(0, this.countToServe));
          return;
      }

      const search = (result as MovieSearch).Search;

      this.searchMovies = search.slice(0, this.countToServe);
    })
  }

  onClose(): void {
    this.onFocusSearchField = '';
    this.searchService.resetForm();
    this.searchService.toggleBackgroundToBlack(false);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}