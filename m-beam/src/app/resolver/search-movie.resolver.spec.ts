import { TestBed } from '@angular/core/testing';

import { SearchMovieResolver } from './search-movie.resolver';

describe('SearchMovieResolver', () => {
  let resolver: SearchMovieResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SearchMovieResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
