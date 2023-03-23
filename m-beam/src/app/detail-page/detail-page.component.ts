import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, map } from 'rxjs';
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
  firstListMovies$!: Observable<MovieDetail[]>;
  movieDetail$: Observable<MovieDetail[]>;

  // loading
  listMoviesIsLoaded: boolean = false;

  // observable
  listsMovies$: Observable<{movieDetail: MovieDetail, firstListMovies: MovieDetail[]}> = new Observable();

  constructor(private route: ActivatedRoute, private movieService: MovieService, private searchService: SearchService, private location: Location) {
    this.listsMovies$ = this.route.data.pipe(map(data => data['movies']));

    this.firstListMovies$ = this.listsMovies$.pipe(
      map(data => {
        return data.firstListMovies;
      })
    )

    this.movieDetail$ = this.listsMovies$.pipe(
      map(data => {
        return [data.movieDetail];
      })
    )
  }

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);
    this.listMoviesIsLoaded = true;
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy(): void {}
}
