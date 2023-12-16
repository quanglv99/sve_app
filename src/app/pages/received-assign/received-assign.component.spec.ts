import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedAssignComponent } from './received-assign.component';

describe('ReceivedAssignComponent', () => {
  let component: ReceivedAssignComponent;
  let fixture: ComponentFixture<ReceivedAssignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceivedAssignComponent]
    });
    fixture = TestBed.createComponent(ReceivedAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
