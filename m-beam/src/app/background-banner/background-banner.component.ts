import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-background-banner',
  templateUrl: './background-banner.component.html',
  styleUrls: ['./background-banner.component.scss']
})
export class BackgroundBannerComponent implements OnInit, OnDestroy {
  onToggleBackgroundToBlack: boolean = false;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.onToggleBackgroundToBlack
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((black: boolean) => {
      this.onToggleBackgroundToBlack = black;
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}