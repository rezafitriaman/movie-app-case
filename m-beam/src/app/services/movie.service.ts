import { Injectable } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MovieSearch } from '../model/movie-search';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private omdbapiUrl = 'http://www.omdbapi.com/?apikey=6c3a2d45&';
  constructor(private http: HttpClient) { }

  getMovieById(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.omdbapiUrl}i=${id}&plot=full`)
  }

  getMovieBySearch(movieTitle: string) {
    console.log('getMovieBySearch- movieTitle', movieTitle);
    return this.http.get<MovieSearch>(`${this.omdbapiUrl}s=${movieTitle}`)
  }
}