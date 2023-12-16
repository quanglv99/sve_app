import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAssignPopupComponent } from './my-assign-popup.component';

describe('MyAssignPopupComponent', () => {
  let component: MyAssignPopupComponent;
  let fixture: ComponentFixture<MyAssignPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyAssignPopupComponent]
    });
    fixture = TestBed.createComponent(MyAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
