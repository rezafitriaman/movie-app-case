import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  snackbarMessage = new Subject<string>();
  durationInSeconds = 10;

  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(message: string): void {
    this._snackBar.open(message, 'close', {
      duration: this.durationInSeconds * 1000,
    });
  }
}