import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-movie-card',
  templateUrl: './detail-movie-card.component.html',
  styleUrls: ['./detail-movie-card.component.scss']
})
export class DetailMovieCardComponent {
  isReadMore = true;
  showText() {
    this.isReadMore = !this.isReadMore;
  }
}
