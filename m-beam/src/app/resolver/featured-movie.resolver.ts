import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, delay, forkJoin, of, tap } from 'rxjs';
import { config } from '../config';
import { MovieService } from '../services/movie.service';
import { MovieDetail } from '../model/movie-detail';

@Injectable({
  providedIn: 'root'
})
export class FeaturedMovieResolver implements Resolve<{featuredMovies: MovieDetail[], firstListMovies: MovieDetail[]}> {
  featuredIds: string[] = config.featuredMovies.ids;
  firstListIds: string[] = config.firstListMovies.ids;

  constructor(private movieService: MovieService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{featuredMovies: MovieDetail[], firstListMovies: MovieDetail[]}> {
    const firstListMovies = this.firstListIds.map((id: string) => {
      return this.movieService.getMovieById(id);
    })

    const featuredMovies = this.featuredIds.map((id: string) => {
      return this.movieService.getMovieById(id);
    })

    return forkJoin({
      featuredMovies: forkJoin(featuredMovies),
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