import { TestBed } from '@angular/core/testing';

import { GpLibDeviceChartService } from './gp-lib-device-chart.service';

describe('GpLibDeviceChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GpLibDeviceChartService = TestBed.get(GpLibDeviceChartService);
    expect(service).toBeTruthy();
  });
});
