import { TestBed } from '@angular/core/testing';

import { DetailMovieResolver } from './detail-movie.resolver';

describe('DetailMovieResolver', () => {
  let resolver: DetailMovieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailMovieResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});