import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerPopupInfoComponent } from './maker-popup-info.component';

describe('MakerPopupInfoComponent', () => {
  let component: MakerPopupInfoComponent;
  let fixture: ComponentFixture<MakerPopupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerPopupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerPopupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
