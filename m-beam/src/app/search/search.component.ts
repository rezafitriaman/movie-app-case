import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() eventTypeEmit = new EventEmitter<'focus'>();
  @Output() searchInputResultEmit = new EventEmitter<string>();
  
  search: FormControl = new FormControl('');
  results: Observable<string>;
  componentDestroyed$: Subject<boolean> = new Subject()

  constructor(private searchService: SearchService) {
    this.results = this.search.valueChanges.pipe(
        filter(search => search !== '' && search !== null),
        map(search => search.trim()),
        debounceTime(1000),
        distinctUntilChanged()
    );

    this.results
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((searchResult: string) => {
      this.searchInputResultEmit.emit(searchResult)
    })
  }

  ngOnInit() {
    this.searchService.onSearchFormReset.subscribe(() => this.search.reset());
  }

  onFocus(event: FocusEvent) {
    this.eventTypeEmit.emit((event.type as 'focus'));
    // on focus at input make the background go black
    this.searchService.toggleBackgroundToBlack(true);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}