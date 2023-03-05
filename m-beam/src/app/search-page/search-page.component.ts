import { Component, OnInit } from '@angular/core';
import { config } from '../config';
import { MovieDetail } from '../model/movie-detail';
import { MovieService } from '../services/movie.service';
import { retry, startWith } from 'rxjs';
import { MovieSearch, Search } from '../model/movie-search';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{
  topTitle: string = config.topTitle;
  topGrossesTitle: string = config.topGrossesTitle;
  searchTitle: string = 'Search results for:';

  topGrossesId: string[] = config.topGrossesId;
  topMovieIds: string[] = config.topMovieIds;
  topGrossesMovies: MovieDetail[] = [];
  topMovies: MovieDetail[] = [];
  searchMovie: Search[] = [];
  onSearchFieldfocus: string = '';

  constructor(private movieService: MovieService) {
    this.getMovie(this.topMovieIds, this.topMovies);
    this.getMovie(this.topGrossesId, this.topGrossesMovies);
  }

  ngOnInit(): void {}

  getMovie(ids: string[], movies: MovieDetail[]): void {
    ids.forEach(id => {
      this.movieService.getMovieById(id)
      .subscribe(movie => movies.push(movie));  
    });
  }

  OnEventType(type: 'focus') {
    this.onSearchFieldfocus = type;
  }

  onSearchInput(searchInputResult: string) {
    this.movieService.getMovieBySearch(searchInputResult)
    .pipe(
      retry(3),
      startWith({Search: []})
    )
    .subscribe((result: MovieSearch | {Search: Search[]}) => this.searchMovie = result.Search);
  }

  onClose() {
    this.onSearchFieldfocus = '';
  }
}
