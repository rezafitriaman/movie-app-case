import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Subject, takeUntil } from 'rxjs';
import { config } from '../config';

@Component({
  selector: 'app-background-banner',
  templateUrl: './background-banner.component.html',
  styleUrls: ['./background-banner.component.scss']
})
export class BackgroundBannerComponent implements OnInit, OnDestroy {
  backgroundSrcsetId: {id: number} = {id: 0};
  onToggleBackgroundToBlack: boolean = false;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchService.onToggleBackgroundToBlack
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((black: boolean) => {
      this.onToggleBackgroundToBlack = black;
    });

    this.backgroundSrcsetId = config.backgroundBanner[Math.floor(Math.random() * 4)];
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}