import { Component, Input, OnInit } from '@angular/core';
import { WorkoutView } from '../../../model/workout.view-model';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../../../service/workout.service';
import { WorkoutComponent } from '../workout/workout.component';

@Component({
  selector: 'app-workout-list',
  imports: [CommonModule, WorkoutComponent],
  templateUrl: './workout-list.component.html',
  styleUrl: './workout-list.component.css'
})
export class WorkoutListComponent implements OnInit {
  @Input() workoutsPerRow: number = 3;       // количество карточек в строке, по умолчанию 3
  @Input() limit: number | null = null;   // ограничение по количеству карточек (если нужно)

  workouts: WorkoutView[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.workouts = this.limit ? workouts.slice(0, this.limit) : workouts;
    });
  }

  get gridTemplateColumns(): string {
    return `repeat(${this.workoutsPerRow}, 1fr)`;
  }
}