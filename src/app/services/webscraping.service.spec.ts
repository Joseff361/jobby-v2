import { TestBed } from '@angular/core/testing';

import { WebscrapingService } from './webscraping.service';

describe('WebscrapingService', () => {
  let service: WebscrapingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebscrapingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
