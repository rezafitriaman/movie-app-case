import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { config } from '../config';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, map, takeUntil, timer } from 'rxjs';
import { SearchService } from '../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-featured-page',
  templateUrl: './featured-page.component.html',
  styleUrls: ['./featured-page.component.scss']
})
export class FeaturedPageComponent implements OnInit, OnDestroy{
  // titles
  featuredMovieTitle: string = config.featuredMovies.title;
  firstListMovieTitle: string = config.firstListMovies.title;
  
  // movies
  featuredMovies: MovieDetail[] = [];
  firstListMovies: MovieDetail[] = [];

  //observable
  listsMovies$: Observable<{featuredMovies: MovieDetail[], firstListMovies: MovieDetail[]}> = new Observable();
  componentDestroyed$: Subject<boolean> = new Subject();

  // loading
  listMoviesIsLoaded: boolean = false;

  constructor(private movieService: MovieService, private searchService: SearchService, private route: ActivatedRoute) {
    this.listsMovies$ = this.route.data.pipe(map(data => data['movies']));
  
    this.listsMovies$
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(({featuredMovies, firstListMovies}: {featuredMovies: MovieDetail[], firstListMovies: MovieDetail[]})=> {
      this.featuredMovies = featuredMovies;
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

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
