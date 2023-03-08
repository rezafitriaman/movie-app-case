import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FeaturedPageComponent } from './featured-page/featured-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'search', title: 'Search', component: SearchPageComponent },
  { path: 'featured', title: 'Featured', component: FeaturedPageComponent },
  { path: 'detail/:id', title: 'Detail', component: DetailPageComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }