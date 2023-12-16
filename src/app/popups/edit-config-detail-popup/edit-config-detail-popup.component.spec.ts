import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigDetailPopupComponent } from './edit-config-detail-popup.component';

describe('EditConfigDetailPopupComponent', () => {
  let component: EditConfigDetailPopupComponent;
  let fixture: ComponentFixture<EditConfigDetailPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditConfigDetailPopupComponent]
    });
    fixture = TestBed.createComponent(EditConfigDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
