import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./search-page/search-page.module').then(m => m.SearchPageModule),
  },
  {
    path: 'featured',
    loadChildren: () => import('./featured-page/featured-page.module').then(m => m.FeaturedPageModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./detail-page/detail-page.module').then(m => m.DetailPageModule),
  },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }