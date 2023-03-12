import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './services/snackbar.service';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'm-beam';
  isLoadingRoute: boolean = false;
  
  constructor(private snackBar: SnackbarService, private movieService: MovieService) {
    this.movieService.isLoadingRoute.subscribe(loading => {
      this.isLoadingRoute = loading;
    })
  }

  ngOnInit(): void {
    this.snackBar.snackbarMessage.subscribe(message => {
      this.snackBar.showSnackBar(message);
    });
  }
}
