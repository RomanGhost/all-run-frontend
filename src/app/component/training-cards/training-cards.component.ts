import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkoutListComponent } from '../view/workout-list/workout-list.component';

@Component({
  selector: 'app-training-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, WorkoutListComponent],
  templateUrl: './training-cards.component.html',
  styleUrl: './training-cards.component.css'
})
export class TrainingCardsComponent {
workouts: any[] = [];
  test() {
    console.log("Hello!")
  }
}
