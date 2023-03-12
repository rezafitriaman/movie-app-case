import { TestBed } from '@angular/core/testing';

import { FeaturedMovieResolver } from './featured-movie.resolver';

describe('FeaturedMovieResolver', () => {
  let resolver: FeaturedMovieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FeaturedMovieResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
