import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberForceComponent } from './member-force.component';

describe('MemberForceComponent', () => {
  let component: MemberForceComponent;
  let fixture: ComponentFixture<MemberForceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MemberForceComponent]
    });
    fixture = TestBed.createComponent(MemberForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
