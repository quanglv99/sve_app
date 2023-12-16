import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDelegateComponent } from './approve-delegate.component';

describe('ApproveDelegateComponent', () => {
  let component: ApproveDelegateComponent;
  let fixture: ComponentFixture<ApproveDelegateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApproveDelegateComponent]
    });
    fixture = TestBed.createComponent(ApproveDelegateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
