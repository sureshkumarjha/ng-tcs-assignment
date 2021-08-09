import { TestBed } from '@angular/core/testing';

import { AdministerVaccinationsService } from './administer-vaccinations-service.service';

describe('AdministerVaccinationsService', () => {
  let service: AdministerVaccinationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministerVaccinationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
