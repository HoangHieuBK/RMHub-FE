import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficAlertFormComponent } from './traffic-alert-form.component';

describe('TrafficAlertFormComponent', () => {
  let component: TrafficAlertFormComponent;
  let fixture: ComponentFixture<TrafficAlertFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficAlertFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficAlertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
