import { Injectable, OnDestroy } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Observable, Subject, forkJoin, retry, switchMap, takeUntil } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieSearch } from '../model/movie-search';
import { Plot } from '../model/plot';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnDestroy{
  private omdbapiUrl = 'http://www.omdbapi.com/?apikey=6c3a2d45&';
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  getMovieById(id: string, plot: Plot = 'full'): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.omdbapiUrl}i=${id}&plot=${plot}`);
  }

  getMovieBySearch(movieTitle: string): Observable<MovieSearch> {
    return this.http.get<MovieSearch>(`${this.omdbapiUrl}s=${movieTitle}`);
  }

  getMovieBySearchwithPlot(searchInputResult: {searchResult: string; selectedSearchByOption: string; selectedPlotOption: Plot;}): Observable<MovieDetail[]> {
    return this.getMovieBySearch(searchInputResult.searchResult)
    .pipe(
      retry(3),
      takeUntil(this.componentDestroyed$),
      switchMap(result => {
        const moviesIds = result.Search.map(item => item.imdbID);
        const moviesDetail = moviesIds.map(id => this.getMovieById(id, searchInputResult.selectedPlotOption));
        
        return forkJoin(moviesDetail);
      })
    )
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}