import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallSupportPopupComponent } from './call-support-popup.component';

describe('CallSupportPopupComponent', () => {
  let component: CallSupportPopupComponent;
  let fixture: ComponentFixture<CallSupportPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CallSupportPopupComponent]
    });
    fixture = TestBed.createComponent(CallSupportPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
