import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDelegatePopupComponent } from './received-delegate-popup.component';

describe('ReceivedDelegatePopupComponent', () => {
  let component: ReceivedDelegatePopupComponent;
  let fixture: ComponentFixture<ReceivedDelegatePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceivedDelegatePopupComponent]
    });
    fixture = TestBed.createComponent(ReceivedDelegatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
