import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiConfig } from '../config/config';
import { WorkoutView } from '../model/workout.view-model';
import { Workout, WorkoutList } from '../model/workout.model';
@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutURL = ApiConfig.apiUrl + ApiConfig.version + ApiConfig.endpoints.workouts;

  constructor(private http: HttpClient) {}

  getWorkouts(duration:number=6000): Observable<WorkoutView[]> {
    return this.http.get<WorkoutList>(`${this.workoutURL}?duration=${duration}`).pipe(
      map((response: WorkoutList) => {
        return response.workouts.map((workout: Workout): WorkoutView => {
          const date = new Date(workout.unix_time_start * 1000);
          const formatted = this.formatDate(date);
          const availableSlots = workout.max_students - workout.accupied_slots;
          const isFull = availableSlots <= 0;

          return {
            id: workout.id,
            date,
            formatted,
            availableSlots,
            isFull
          };
        });
      })
    );
  }


  private formatDate(date: Date): string {
    const pad = (n: number) => (n < 10 ? '0' + n : n.toString());
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const weekday = weekdays[date.getDay()];

    return `${weekday}, ${day}.${month}.${year} ${hours}:${minutes}`;
  }
}
