import { TestBed } from '@angular/core/testing';

import { FoundboxService } from './foundbox.service';

describe('FoundboxService', () => {
  let service: FoundboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoundboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
