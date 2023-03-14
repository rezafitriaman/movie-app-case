import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './detail-page.component';
import { DetailMovieResolver } from '../resolver/detail-movie.resolver';

const routes: Routes = [
  {
    path: '',
    title: 'Detail',
    component: DetailPageComponent,
    resolve: { movies: DetailMovieResolver },
  }
];
console.log('object');

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailPageRoutingModule { }