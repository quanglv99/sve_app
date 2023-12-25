import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoleGroupComponent } from './add-role-group.component';

describe('AddRoleGroupComponent', () => {
  let component: AddRoleGroupComponent;
  let fixture: ComponentFixture<AddRoleGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddRoleGroupComponent]
    });
    fixture = TestBed.createComponent(AddRoleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
