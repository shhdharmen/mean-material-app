import { TestBed } from '@angular/core/testing';

import { PageTitleService } from './page-title.service';

describe('PageTitleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageTitleService = TestBed.get(PageTitleService);
    expect(service).toBeTruthy();
  });
});
