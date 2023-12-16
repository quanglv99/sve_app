import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDelegatePopupComponent } from './my-delegate-popup.component';

describe('MyDelegatePopupComponent', () => {
  let component: MyDelegatePopupComponent;
  let fixture: ComponentFixture<MyDelegatePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyDelegatePopupComponent]
    });
    fixture = TestBed.createComponent(MyDelegatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
