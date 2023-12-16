import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAssignComponent } from './register-assign.component';

describe('RegisterAssignComponent', () => {
  let component: RegisterAssignComponent;
  let fixture: ComponentFixture<RegisterAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RegisterAssignComponent]
    });
    fixture = TestBed.createComponent(RegisterAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
