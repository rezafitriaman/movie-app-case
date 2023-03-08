import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { MovieDetail } from '../model/movie-detail';
import { config } from '../config';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  moviesDetails: MovieDetail[] = [];
  topTitle: string = config.topTitle;
  topMovieIds: Array<string> = config.topMovieIds;
  topMovies: MovieDetail[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService, private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.toggleBackgroundToBlack(false);

    const id: Observable<string> = this.route.params.pipe(map(p => p['id']));
    
    id.subscribe(id => {
      this.moviesDetails = [];
      this.getMovie([id], this.moviesDetails);
    });

    this.getMovie(this.topMovieIds, this.topMovies);
  }

  getMovie(ids: string[], movies: MovieDetail[]): void {
    ids.forEach(id => {
      this.movieService.getMovieById(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(movie => {
        movies.push(movie);
      });
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
