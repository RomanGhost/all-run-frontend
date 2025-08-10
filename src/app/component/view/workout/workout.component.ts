import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutView } from '../../../model/workout.view-model';

@Component({
  selector: 'app-workout',
  imports: [],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.css'
})
export class WorkoutComponent {
@Input() workout!: WorkoutView;
constructor(private router: Router) {}

goToPurchase(workoutId: number) {
    // Переход на страницу покупки с передачей id карточки
    this.router.navigate(['/workout', workoutId]);
  }
}
