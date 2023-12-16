import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDelegateComponent } from './my-delegate.component';

describe('MyDelegateComponent', () => {
  let component: MyDelegateComponent;
  let fixture: ComponentFixture<MyDelegateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyDelegateComponent]
    });
    fixture = TestBed.createComponent(MyDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
