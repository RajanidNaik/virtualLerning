import { TestBed } from '@angular/core/testing';

import { AuthserviceInterceptor } from './authservice.interceptor';

describe('AuthserviceInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthserviceInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthserviceInterceptor = TestBed.inject(AuthserviceInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
