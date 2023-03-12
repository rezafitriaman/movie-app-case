import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FeaturedPageComponent } from './featured-page/featured-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchMovieResolver } from './resolver/search-movie.resolver';
import { FeaturedMovieResolver } from './resolver/featured-movie.resolver';
import { DetailMovieResolver } from './resolver/detail-movie.resolver';

const routes: Routes = [
  { path: 'search', title: 'Search', component: SearchPageComponent, resolve: {movies: SearchMovieResolver} },
  { path: 'featured', title: 'Featured', component: FeaturedPageComponent, resolve: {movies: FeaturedMovieResolver} },
  { path: 'detail/:id', title: 'Detail', component: DetailPageComponent, resolve: {movies: DetailMovieResolver} },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }