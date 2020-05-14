import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerPopupSosComponent } from './marker-popup-sos.component';

describe('MarkerPopupSosComponent', () => {
  let component: MarkerPopupSosComponent;
  let fixture: ComponentFixture<MarkerPopupSosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerPopupSosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerPopupSosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
