import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutFullInfoComponent } from './workout-full-info.component';

describe('WorkoutFullInfoComponent', () => {
  let component: WorkoutFullInfoComponent;
  let fixture: ComponentFixture<WorkoutFullInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutFullInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutFullInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
