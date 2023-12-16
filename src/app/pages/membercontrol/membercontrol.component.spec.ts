import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembercontrolComponent } from './membercontrol.component';

describe('MembercontrolComponent', () => {
  let component: MembercontrolComponent;
  let fixture: ComponentFixture<MembercontrolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MembercontrolComponent]
    });
    fixture = TestBed.createComponent(MembercontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
