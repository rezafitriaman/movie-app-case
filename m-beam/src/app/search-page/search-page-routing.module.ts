import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page.component';
import { SearchMovieResolver } from '../resolver/search-movie.resolver';

const routes: Routes = [
  {
    path: '',
    title: 'Search',
    component: SearchPageComponent,
    resolve: { movies: SearchMovieResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPageRoutingModule { }
