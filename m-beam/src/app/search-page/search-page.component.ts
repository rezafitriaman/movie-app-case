import { Component, OnDestroy, OnInit } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';
import { Subject, retry, takeUntil } from 'rxjs';
import { MovieSearch, NotFound, Search } from '../model/movie-search';
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

  constructor(private movieService: MovieService, private searchService: SearchService) {
    this.getMovies(this.topMovieIds, this.topMovies);
    this.getMovies(this.topGrossesId, this.topGrossesMovies);
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
  }

  getMovies(ids: string[], movies: MovieDetail[]): void {
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
      this.movieService.getMovieBySearchwithPlot(searchInputResult)
        .pipe(
          retry(3),
          takeUntil(this.componentDestroyed$)
        ).subscribe((result: MovieDetail[]) => {
          console.log('object', result);
          const responseSet = [...new Set(result.map(r => r.Response))];
          const response = responseSet.length === 1 ? responseSet[0] : 'True';
          this.responseFalse(response, 'Movies not found', this.searchMoviesWithPlot)
          this.searchMovie = [];
          const movieDetailSearchResult: MovieDetailSearch[] = result.map(m => {
            return {
              Poster: m.Poster,
              Title: m.Title,
              Type: m.Type,
              Year: m.Year,
              Rated: m.Rated,
              Genre: m.Genre,
              Director: m.Director,
              Actors: m.Actors,
              Plot: m.Plot,
              Awards: m.Plot,
              imdbID: m.imdbID
            }
          })
          this.searchMoviesWithPlot = movieDetailSearchResult.slice(0, 5);
          
          this.isLoading = false;
        });
      
        break;
      case 'title':
      this.movieService.getMovieBySearch(searchInputResult.searchResult)
        .pipe(
          retry(3),
          takeUntil(this.componentDestroyed$)
        ).subscribe((result: MovieSearch | NotFound) => {
          this.responseFalse(result.Response, result.Error, this.searchMovie)
          const search = (result as MovieSearch).Search;

          this.searchMoviesWithPlot = [];
          this.searchMovie = search.slice(0, 5);
          this.isLoading = false;
        });  
        break;
      default:
        break;
    }
  }

  responseFalse(response: string, responseText: string, resetMovie: Search[] | MovieDetailSearch[]): void {
    if(response === 'False') {
      this.searchTitle = responseText;
      resetMovie = [];
      return;
    }
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