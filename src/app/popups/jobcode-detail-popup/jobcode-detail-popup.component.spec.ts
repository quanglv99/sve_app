import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobcodeDetailPopupComponent } from './jobcode-detail-popup.component';

describe('JobcodeDetailPopupComponent', () => {
  let component: JobcodeDetailPopupComponent;
  let fixture: ComponentFixture<JobcodeDetailPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JobcodeDetailPopupComponent]
    });
    fixture = TestBed.createComponent(JobcodeDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
