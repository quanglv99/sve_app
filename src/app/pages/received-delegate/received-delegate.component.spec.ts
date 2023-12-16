import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedDelegateComponent } from './received-delegate.component';

describe('ReceivedDelegateComponent', () => {
  let component: ReceivedDelegateComponent;
  let fixture: ComponentFixture<ReceivedDelegateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReceivedDelegateComponent]
    });
    fixture = TestBed.createComponent(ReceivedDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
