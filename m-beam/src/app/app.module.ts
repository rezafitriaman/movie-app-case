import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LogoComponent } from './logo/logo.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StickyNavigationComponent } from './sticky-navigation/sticky-navigation.component';
import { SearchComponent } from './search/search.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BackgroundBannerComponent } from './background-banner/background-banner.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FeaturedPageComponent } from './featured-page/featured-page.component';
import { FeaturedMovieCardComponent } from './featured-movie-card/featured-movie-card.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { DetailMovieCardComponent } from './detail-movie-card/detail-movie-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RetryInterceptor } from './services/retry.interceptor';
import { HttpErrorInterceptor } from './services/http-error.interceptor';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavigationComponent,
    StickyNavigationComponent,
    SearchComponent,
    MovieCardComponent,
    BackgroundBannerComponent,
    SearchPageComponent,
    FeaturedPageComponent,
    FeaturedMovieCardComponent,
    DetailPageComponent,
    DetailMovieCardComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: RetryInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
