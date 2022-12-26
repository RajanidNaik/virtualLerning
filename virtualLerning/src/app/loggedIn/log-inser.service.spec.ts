import { TestBed } from '@angular/core/testing';

import { LogInserService } from './log-inser.service';

describe('LogInserService', () => {
  let service: LogInserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogInserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
