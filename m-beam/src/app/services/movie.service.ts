import { Injectable } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private omdbapiUrl = 'http://www.omdbapi.com/?apikey=6c3a2d45&';
  constructor(private http: HttpClient) { }

  getMovieById(id: string): Observable<MovieDetail> {
    return this.http.get<MovieDetail>(`${this.omdbapiUrl}i=${id}&plot=full`)
  }
}
