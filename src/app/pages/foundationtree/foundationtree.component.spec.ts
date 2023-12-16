import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundationtreeComponent } from './foundationtree.component';

describe('FoundationtreeComponent', () => {
  let component: FoundationtreeComponent;
  let fixture: ComponentFixture<FoundationtreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FoundationtreeComponent]
    });
    fixture = TestBed.createComponent(FoundationtreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
