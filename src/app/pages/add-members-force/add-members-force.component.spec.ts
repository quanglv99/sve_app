import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersForceComponent } from './add-members-force.component';

describe('AddMembersForceComponent', () => {
  let component: AddMembersForceComponent;
  let fixture: ComponentFixture<AddMembersForceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddMembersForceComponent]
    });
    fixture = TestBed.createComponent(AddMembersForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
