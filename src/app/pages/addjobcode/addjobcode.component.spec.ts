import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddjobcodeComponent } from './addjobcode.component';

describe('AddjobcodeComponent', () => {
  let component: AddjobcodeComponent;
  let fixture: ComponentFixture<AddjobcodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddjobcodeComponent]
    });
    fixture = TestBed.createComponent(AddjobcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
