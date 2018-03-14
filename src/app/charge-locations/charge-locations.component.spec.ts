import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeLocationsComponent } from './charge-locations.component';

describe('ChargeLocationsComponent', () => {
  let component: ChargeLocationsComponent;
  let fixture: ComponentFixture<ChargeLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
