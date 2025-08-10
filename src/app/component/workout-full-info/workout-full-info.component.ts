import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkoutView } from '../../model/workout.view-model';
import { WorkoutService } from '../../service/workout.service';

@Component({
  selector: 'app-workout-full-info',
  imports: [],
  templateUrl: './workout-full-info.component.html',
  styleUrl: './workout-full-info.component.css'
})
export class WorkoutFullInfoComponent implements OnInit {
  workout?: WorkoutView;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.workoutService.getWorkoutById(+id).subscribe(data => {
        this.workout = data;
        console.log(`Workout info: ${this.workout.price}`);
      });
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register'], { queryParams: { workoutId: this.workout?.id } });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}