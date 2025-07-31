import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCardsComponent } from './training-cards.component';

describe('TrainingCardsComponent', () => {
  let component: TrainingCardsComponent;
  let fixture: ComponentFixture<TrainingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
