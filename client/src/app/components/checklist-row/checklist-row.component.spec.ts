import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistRowComponent } from './checklist-row.component';

describe('ChecklistRowComponent', () => {
  let component: ChecklistRowComponent;
  let fixture: ComponentFixture<ChecklistRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
