import { TestBed } from '@angular/core/testing';

import { MybookService } from './mybook.service';

describe('MybookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MybookService = TestBed.get(MybookService);
    expect(service).toBeTruthy();
  });
});
