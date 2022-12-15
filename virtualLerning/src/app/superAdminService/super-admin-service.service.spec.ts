import { TestBed } from '@angular/core/testing';

import { SuperAdminServiceService } from './super-admin-service.service';

describe('SuperAdminServiceService', () => {
  let service: SuperAdminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
