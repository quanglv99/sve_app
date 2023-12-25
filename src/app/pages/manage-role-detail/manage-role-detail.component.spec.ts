import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRoleDetailComponent } from './manage-role-detail.component';

describe('ManageRoleDetailComponent', () => {
  let component: ManageRoleDetailComponent;
  let fixture: ComponentFixture<ManageRoleDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManageRoleDetailComponent]
    });
    fixture = TestBed.createComponent(ManageRoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
