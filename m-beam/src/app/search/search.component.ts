import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject, debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs';
import { SearchService } from '../services/search.service';
import { OptionValue } from '../model/search-by-option';
import { Plot } from '../model/plot';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() OnFocusEventEmit = new EventEmitter<'focus'>();
  @Output() searchInputResultEmit = new EventEmitter<{ 'searchResult': string; 'selectedSearchByOption':string; 'selectedPlotOption': Plot; }>();
  
  search: FormControl = new FormControl('');
  searchResult: Observable<string>;

  selectedSearchByOption: FormControl = new FormControl('plot');
  selectedSearchByOptionsResult: Observable<string>;
  
  selectedPlotOption: FormControl = new FormControl({value: 'full', disabled: false});
  selectedPlotOptionsResult: Observable<Plot>;

  plotOptions: OptionValue[] = [
    {value: 'full', viewValue: 'Full'},
    {value: 'short', viewValue: 'Short'},
  ];

  searchByOptions: OptionValue[] = [
    {value: 'plot', viewValue: 'Search by Title with plot'},
    {value: 'title', viewValue: 'Search by Title'},
  ];
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private searchService: SearchService) {
    this.searchResult = this.search.valueChanges.pipe(
        filter(search => search !== '' && search !== null),
        map(search => search.trim()),
        debounceTime(1000),
        distinctUntilChanged()
    );

    this.selectedSearchByOptionsResult = this.selectedSearchByOption.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    this.selectedPlotOptionsResult = this.selectedPlotOption.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  ngOnInit() {
    this.searchService.onSearchFormReset.subscribe(() => this.search.reset());

    this.searchResult
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(searchResult => {      
      this.searchInputResultEmit.emit({'searchResult': searchResult, 'selectedSearchByOption':this.selectedSearchByOption.value, 'selectedPlotOption': this.selectedPlotOption.value});
    });

    this.selectedSearchByOptionsResult
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(result => {
      this.searchInputResultEmit.emit({'searchResult': this.search.value, 'selectedSearchByOption': result, 'selectedPlotOption': this.selectedPlotOption.value});
      if(result === 'title') {
        this.selectedPlotOption.disable();
        return;
      }
      this.selectedPlotOption.enable();
    })

    this.selectedPlotOptionsResult
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(result => {
      if(this.selectedPlotOption.disabled) {
        return;
      }
      this.searchInputResultEmit.emit({'searchResult': this.search.value, 'selectedSearchByOption': this.selectedSearchByOption.value, 'selectedPlotOption': result});
    })
  }

  onFocus(event: FocusEvent): void {
    this.OnFocusEventEmit.emit((event.type as 'focus'));
    // on focus at input make the background go black
    this.searchService.toggleBackgroundToBlack(true);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}