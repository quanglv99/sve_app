import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignComponent } from './my-assign.component';

describe('MyAssignComponent', () => {
  let component: MyAssignComponent;
  let fixture: ComponentFixture<MyAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyAssignComponent]
    });
    fixture = TestBed.createComponent(MyAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
