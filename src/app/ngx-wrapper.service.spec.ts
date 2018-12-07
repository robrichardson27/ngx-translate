import { TestBed } from '@angular/core/testing';

import { NgxWrapperService } from './ngx-wrapper.service';

describe('NgxWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxWrapperService = TestBed.get(NgxWrapperService);
    expect(service).toBeTruthy();
  });
});
