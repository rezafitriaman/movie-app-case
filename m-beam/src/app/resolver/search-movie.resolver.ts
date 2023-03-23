import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, forkJoin, tap} from 'rxjs';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';

@Injectable({
  providedIn: 'root'
})
export class SearchMovieResolver implements Resolve<{firstListMovies: MovieDetail[], secondListMovies: MovieDetail[]}> {
  firstListIds: string[] = config.firstListMovies.ids;
  secondListIds: string[] = config.secondListMovies.ids;

  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{firstListMovies: MovieDetail[], secondListMovies: MovieDetail[]}> {
    const firstListMovies = this.firstListIds.map((id: string) => {
      return this.movieService.getMovieById(id);
    })
    
    const secondListMovies = this.secondListIds.map((id: string) => {
      return this.movieService.getMovieById(id);
    })

    return forkJoin({
      firstListMovies: forkJoin(firstListMovies), 
      secondListMovies: forkJoin(secondListMovies)
    })
    .pipe(
      tap(_ => {
        this.movieService.isLoadingRoute.next(false);
      })
    )
  }
}