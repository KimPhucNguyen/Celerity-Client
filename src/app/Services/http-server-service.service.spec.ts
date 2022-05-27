import { TestBed } from '@angular/core/testing';

import { HttpServerServiceService } from './http-server-service.service';

describe('HttpServerServiceService', () => {
  let service: HttpServerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpServerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
