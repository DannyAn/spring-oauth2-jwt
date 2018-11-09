import { TestBed, inject } from '@angular/core/testing';

import { RefreshTokenInterceptor } from './refresh-token.interceptor';

describe('TokenRefreshService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RefreshTokenInterceptor]
    });
  });

  it('should be created', inject([RefreshTokenInterceptor], (service: RefreshTokenInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
