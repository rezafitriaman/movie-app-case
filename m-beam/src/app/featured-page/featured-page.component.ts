import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDetail } from '../model/movie-detail';
import { config } from '../config';
import { MovieService } from '../services/movie.service';
import { Observable, map } from 'rxjs';
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
  featuredMovies$: Observable<MovieDetail[]>;
  firstListMovies$: Observable<MovieDetail[]>;

  //observable
  listsMovies$: Observable<{featuredMovies: MovieDetail[], firstListMovies: MovieDetail[]}> = new Observable();

  // loading
  listMoviesIsLoaded: boolean = false;

  constructor(private movieService: MovieService, private searchService: SearchService, private route: ActivatedRoute) {
    this.listsMovies$ = this.route.data.pipe(map(data => data['movies']));
  
    this.firstListMovies$ = this.listsMovies$.pipe(
      map(data => {
        return data.firstListMovies;
      })
    )

    this.featuredMovies$ = this.listsMovies$.pipe(
      map(data => {
        return data.featuredMovies;
      })
    )
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
    this.listMoviesIsLoaded = true;
  }

  ngOnDestroy(): void {}
}
