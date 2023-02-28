import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedMovieCardComponent } from './featured-movie-card.component';

describe('FeaturedMovieCardComponent', () => {
  let component: FeaturedMovieCardComponent;
  let fixture: ComponentFixture<FeaturedMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedMovieCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
