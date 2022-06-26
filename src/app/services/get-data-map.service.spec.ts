import { TestBed } from '@angular/core/testing';

import { GetDataMapService } from './get-data-map.service';

describe('GetDataMapService', () => {
  let service: GetDataMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
