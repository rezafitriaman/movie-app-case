import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  onSearchFormReset = new Subject<void>();
  onToggleBackgroundToBlack = new Subject<boolean>();

  constructor() { }

  resetForm(): void {
    this.onSearchFormReset.next();
  }

  toggleBackgroundToBlack(black: boolean): void {
    this.onToggleBackgroundToBlack.next(black);
  }
}