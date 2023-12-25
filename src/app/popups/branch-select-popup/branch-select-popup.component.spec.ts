import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSelectPopupComponent } from './branch-select-popup.component';

describe('BranchSelectPopupComponent', () => {
  let component: BranchSelectPopupComponent;
  let fixture: ComponentFixture<BranchSelectPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BranchSelectPopupComponent]
    });
    fixture = TestBed.createComponent(BranchSelectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
