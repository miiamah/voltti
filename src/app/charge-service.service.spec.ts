import { TestBed, inject } from '@angular/core/testing';

import { ChargeServiceService } from './charge-service.service';

describe('ChargeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChargeServiceService]
    });
  });

  it('should be created', inject([ChargeServiceService], (service: ChargeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
