import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, map, takeUntil, timer } from 'rxjs';
import { MovieDetail } from '../model/movie-detail';
import { config } from '../config';
import { SearchService } from '../services/search.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  //titles
  firstListMovieTitle: string = config.firstListMovies.title;

  // movies
  firstListMovies: MovieDetail[] = [];
  movieDetail: MovieDetail[] = [];

  // loading
  listMoviesIsLoaded: boolean = false;

  // observable
  listsMovies$: Observable<{movieDetail: MovieDetail, firstListMovies: MovieDetail[]}> = new Observable();
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private route: ActivatedRoute, private movieService: MovieService, private searchService: SearchService, private location: Location) {
    this.listsMovies$ = this.route.data.pipe(map(data => data['movies']));

    this.listsMovies$
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(({movieDetail, firstListMovies}: {movieDetail: MovieDetail, firstListMovies: MovieDetail[]})=> {
      this.movieDetail = [movieDetail];
      this.firstListMovies = firstListMovies;
      
      timer(300)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(_ => {
        this.listMoviesIsLoaded = true;
      });

      this.movieService.isLoadingRoute.next(false);
    })
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
