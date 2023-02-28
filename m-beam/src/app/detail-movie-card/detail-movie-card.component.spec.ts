import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMovieCardComponent } from './detail-movie-card.component';

describe('DetailMovieCardComponent', () => {
  let component: DetailMovieCardComponent;
  let fixture: ComponentFixture<DetailMovieCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMovieCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
