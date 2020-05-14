import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerPopupCameraComponent } from './marker-popup-camera.component';

describe('MarkerPopupCameraComponent', () => {
  let component: MarkerPopupCameraComponent;
  let fixture: ComponentFixture<MarkerPopupCameraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerPopupCameraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerPopupCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
