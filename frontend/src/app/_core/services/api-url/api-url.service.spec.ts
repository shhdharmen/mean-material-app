import { TestBed } from '@angular/core/testing';

import { ApiUrlService } from './api-url.service';

describe('ApiUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiUrlService = TestBed.get(ApiUrlService);
    expect(service).toBeTruthy();
  });
});
