import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryBreakdownComponent } from './salary-breakdown.component';

describe('SalaryBreakdownComponent', () => {
  let component: SalaryBreakdownComponent;
  let fixture: ComponentFixture<SalaryBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryBreakdownComponent]
    });
    fixture = TestBed.createComponent(SalaryBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
