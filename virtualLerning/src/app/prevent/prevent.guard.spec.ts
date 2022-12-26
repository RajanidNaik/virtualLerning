import { TestBed } from '@angular/core/testing';

import { PreventGuard } from './prevent.guard';

describe('PreventGuard', () => {
  let guard: PreventGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PreventGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
