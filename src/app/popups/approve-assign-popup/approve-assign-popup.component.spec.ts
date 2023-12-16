import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAssignPopupComponent } from './approve-assign-popup.component';

describe('ApproveAssignPopupComponent', () => {
  let component: ApproveAssignPopupComponent;
  let fixture: ComponentFixture<ApproveAssignPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApproveAssignPopupComponent]
    });
    fixture = TestBed.createComponent(ApproveAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
