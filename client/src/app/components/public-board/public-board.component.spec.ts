import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBoardComponent } from './public-board.component';

describe('PublicBoardComponent', () => {
  let component: PublicBoardComponent;
  let fixture: ComponentFixture<PublicBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
