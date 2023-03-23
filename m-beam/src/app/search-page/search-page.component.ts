import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, map, of } from 'rxjs';
import { MovieSearch, MovieSearchPlot } from '../model/movie-search';
import { SearchService } from '../services/search.service';
import { Plot } from '../model/plot';
import { MovieDetailSearch } from '../model/movie-detail-search';
import { ActivatedRoute } from '@angular/router';
import { Search } from '../model/search';
import { ErrorResponseMovie } from '../model/error-response-movie';

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
  firstListMovies$!: Observable<MovieDetail[]>;
  secondListMovies$!: Observable<MovieDetail[]>; 

  // search movies
  searchMovies$!: Observable<Search[]>;
  searchMoviesWithPlot$!: Observable<MovieDetailSearch[]>;

  // loading
  listMoviesIsLoaded: boolean = false;
  isLoadingSearchMovie: boolean = false;

  // event
  onFocusSearchField: string = '';

  // observable
  getMovieBySearch$!: Observable<MovieSearch | MovieSearchPlot>;
  listsMovies$: Observable<{firstListMovies: MovieDetail[], secondListMovies: MovieDetail[]}>;

  constructor(private movieService: MovieService, private searchService: SearchService, private route: ActivatedRoute) {
    this.listsMovies$ = this.route.data.pipe(map(data => data['movies']));

    this.firstListMovies$ = this.listsMovies$.pipe(
      map(data => {
        return data.firstListMovies;
      })
    )

    this.secondListMovies$ = this.listsMovies$.pipe(
      map(data => {
        return data.secondListMovies;
      })
    )
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
    this.listMoviesIsLoaded = true;
  }

  OnFocusEvent(type: 'focus'): void {
    this.onFocusSearchField = type;
  }

  onSearchInput(searchInputResult: {searchResult: string; selectedSearchByOption: string; selectedPlotOption: Plot;}): void {
    // if search result is empty then dont send the request
    if(searchInputResult.searchResult === null || searchInputResult.searchResult === '') return;

    this.isLoadingSearchMovie = true;
    this.searchTitle = `Search results: ${searchInputResult.searchResult}`;

    this.searchMoviesWithPlot$ = of([]);
    this.searchMovies$ = of([]);
    // switch search mode
    switch (searchInputResult.selectedSearchByOption) {
      case 'plot':
        this.searchMoviesWithPlot$ = this.movieService.getMovieBySearchwithPlot(searchInputResult)
        .pipe(
          map((movie: ErrorResponseMovie | MovieDetailSearch[]) => {
            this.isLoadingSearchMovie = false;

            if((movie as ErrorResponseMovie).Response === 'False') {
              this.searchTitle = (movie as ErrorResponseMovie).Error;
              return [];
            }

            return (movie as MovieDetailSearch[]).slice(0, this.countToServe);
          })
        )

        break;
      case 'title':
        this.searchMovies$ = this.movieService.getMovieBySearch(searchInputResult.searchResult)
        .pipe(
          map((movie: MovieSearch) => {
            this.isLoadingSearchMovie = false;

            if(movie.Response === 'False') {
              this.searchTitle = movie.Error;
              return [];
            }
            return (movie.Search as Search[]).slice(0, this.countToServe);
          })
        );
        break;
    }
  }

  onClose(): void {
    this.onFocusSearchField = '';
    this.searchService.resetForm();
    this.searchService.toggleBackgroundToBlack(false);
  }

  ngOnDestroy(): void {}
}