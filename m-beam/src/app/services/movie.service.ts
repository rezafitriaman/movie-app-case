import { Injectable, OnDestroy } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Observable, Subject, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieSearch } from '../model/movie-search';
import { Plot } from '../model/plot';
import { MovieDetailSearch } from '../model/movie-detail-search';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnDestroy{
  private omdbapiUrl = 'http://www.omdbapi.com/?apikey=6c3a2d45&';
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  getMovieById(id: string, plot: Plot = 'full'): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.omdbapiUrl}i=${id}&plot=${plot}`);
    // test error request
    //return this.http.get<MovieDetail>(`https://example.com/404`);
  }

  getMovieBySearch(movieTitle: string): Observable<MovieSearch> {
    return this.http.get<MovieSearch>(`${this.omdbapiUrl}s=${movieTitle}`);
  }

  getMovieBySearchwithPlot(searchInputResult: {searchResult: string; selectedSearchByOption: string; selectedPlotOption: Plot;}): Observable<MovieSearch | 
  {
    Search: Observable<MovieDetailSearch[]>;
    totalResults: string;
    Response: string;
    Error: string;
  }> {
    return this.getMovieBySearch(searchInputResult.searchResult)
    .pipe(
      takeUntil(this.componentDestroyed$),
      switchMap(response => {
        if(response.Response === 'False') {
          return of(response);
        }

        const moviesIds = response.Search.map(item => item.imdbID);
        const moviesDetail = moviesIds.map((id: string) => {
          return this.getMovieById(id, searchInputResult.selectedPlotOption)
          .pipe(
            takeUntil(this.componentDestroyed$),
            map((movie: MovieDetail) => {
            return {
                Poster: movie.Poster,
                Title: movie.Title,
                Type: movie.Type,
                Year: movie.Year,
                Rated: movie.Rated,
                Genre: movie.Genre,
                Director: movie.Director,
                Actors: movie.Actors,
                Plot: movie.Plot,
                Awards: movie.Awards,
                imdbID: movie.imdbID,
                Response: movie.Response,
            }
          }))
        });
        
        return of({
          Search: forkJoin(moviesDetail),
          totalResults: response.totalResults,
          Response: response.Response,
          Error: response.Error
        });
      })
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}