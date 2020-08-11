import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpLibDeviceChartComponent } from './gp-lib-device-chart.component';

describe('GpLibDeviceChartComponent', () => {
  let component: GpLibDeviceChartComponent;
  let fixture: ComponentFixture<GpLibDeviceChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpLibDeviceChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpLibDeviceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
