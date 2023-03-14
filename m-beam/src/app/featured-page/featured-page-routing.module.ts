import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedPageComponent } from './featured-page.component';
import { FeaturedMovieResolver } from '../resolver/featured-movie.resolver';

const routes: Routes = [
  {
    path: '',
    title: 'Featured',
    component: FeaturedPageComponent,
    resolve: { movies: FeaturedMovieResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturedPageRoutingModule { }
