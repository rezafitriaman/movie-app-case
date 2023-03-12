import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, delay, forkJoin, tap } from 'rxjs';
import { config } from '../config';
import { MovieService } from '../services/movie.service';
import { MovieDetail } from '../model/movie-detail';

@Injectable({
  providedIn: 'root'
})
export class DetailMovieResolver implements Resolve<{movieDetail: MovieDetail, firstListMovies: MovieDetail[]}> {
  firstListIds: string[] = config.firstListMovies.ids;

  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{movieDetail: MovieDetail, firstListMovies: MovieDetail[]}> {
    const movieDetail = this.movieService.getMovieById(route.params['id'])
    const firstListMovies = this.firstListIds.map((id: string) => {
      return this.movieService.getMovieById(id);
    })

    return forkJoin({
      movieDetail: movieDetail, 
      firstListMovies: forkJoin(firstListMovies)
    })
    .pipe(
      tap(() => {
        this.movieService.isLoadingRoute.next(true);
      }),
      delay(100),
    )
  }
}
