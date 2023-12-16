import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedAssignPopupComponent } from './received-assign-popup.component';

describe('ReceivedAssignPopupComponent', () => {
  let component: ReceivedAssignPopupComponent;
  let fixture: ComponentFixture<ReceivedAssignPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceivedAssignPopupComponent]
    });
    fixture = TestBed.createComponent(ReceivedAssignPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
