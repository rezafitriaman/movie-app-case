import { Injectable, OnDestroy } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Observable, Subject, forkJoin, map, of, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieSearch } from '../model/movie-search';
import { Plot } from '../model/plot';
import { environment } from "../../environments/environment.demo";
import { MovieDetailSearch } from '../model/movie-detail-search';
import { ErrorResponseMovie } from '../model/error-response-movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnDestroy {
  private omdbapiUrl = `http://www.omdbapi.com/?apikey=${environment.API_KEY}&`;
  isLoadingRoute: Subject<boolean> = new Subject();
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {}

  getMovieById(id: string, plot: Plot = 'full'): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.omdbapiUrl}i=${id}&plot=${plot}`);
  }

  getMovieBySearch(movieTitle: string): Observable<MovieSearch> {
    return this.http.get<MovieSearch>(`${this.omdbapiUrl}s=${movieTitle}`);
  }

  getMovieBySearchwithPlot(searchInputResult: { searchResult: string; selectedSearchByOption: string; selectedPlotOption: Plot; }): Observable<ErrorResponseMovie | MovieDetailSearch[]> {
    return this.getMovieBySearch(searchInputResult.searchResult)
    .pipe(
      takeUntil(this.componentDestroyed$),
      switchMap(response => {
        if(response.Response === 'False') {
          return of(response);
        }

        const movieIds = response.Search.map(item => item.imdbID);
        const moviesDetail = movieIds.map((id: string) => {
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
                Writer: movie.Writer,
                Response: movie.Response,
                Error: movie.Error
            }
          }))
        });
        return forkJoin(moviesDetail);
      })
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}