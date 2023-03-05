import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, filter, map } from 'rxjs';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() eventTypeEmit = new EventEmitter<'focus'>();
  @Output() searchInputResultEmit = new EventEmitter<string>();
  
  search: FormControl = new FormControl('');
  results: Observable<string>;

  constructor(private movieService: MovieService) {
    this.results = this.search.valueChanges.pipe(
      map(search => search.trim()),
        debounceTime(1000),
        distinctUntilChanged(),
        filter(search => search !== '')
    );

    this.results.subscribe((searchResult: string) => {
      this.searchInputResultEmit.emit(searchResult)
    })
  }

  onFocus(event: FocusEvent) {
    this.eventTypeEmit.emit((event.type as 'focus'));
  }
}