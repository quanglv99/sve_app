import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberForceDetailPopupComponent } from './edit-member-force-detail-popup.component';

describe('EditMemberForceDetailPopupComponent', () => {
  let component: EditMemberForceDetailPopupComponent;
  let fixture: ComponentFixture<EditMemberForceDetailPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditMemberForceDetailPopupComponent]
    });
    fixture = TestBed.createComponent(EditMemberForceDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
