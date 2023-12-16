import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveAssignComponent } from './approve-assign.component';

describe('ApproveAssignComponent', () => {
  let component: ApproveAssignComponent;
  let fixture: ComponentFixture<ApproveAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApproveAssignComponent]
    });
    fixture = TestBed.createComponent(ApproveAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
