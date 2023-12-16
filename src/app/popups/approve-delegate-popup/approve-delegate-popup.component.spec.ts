import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDelegatePopupComponent } from './approve-delegate-popup.component';

describe('ApproveDelegatePopupComponent', () => {
  let component: ApproveDelegatePopupComponent;
  let fixture: ComponentFixture<ApproveDelegatePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApproveDelegatePopupComponent]
    });
    fixture = TestBed.createComponent(ApproveDelegatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
