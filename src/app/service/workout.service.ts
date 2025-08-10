import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiConfig } from '../config/config';
import { Workout, WorkoutList } from '../model/workout.model';
import { WorkoutView } from '../model/workout.view-model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutURL = ApiConfig.apiUrl + ApiConfig.version + ApiConfig.endpoints.workoutsAvalaibles;

  constructor(private http: HttpClient) {}

  getWorkouts(): Observable<WorkoutView[]> {
    return this.http.get<WorkoutList>(this.workoutURL).pipe(
      map((response: WorkoutList) => {
        console.log("Get data from server")
        return response.workoutList.map((workout: Workout): WorkoutView => {
          const validFromDate = new Date(workout.validFrom * 1000);
          const validToDate = new Date(workout.validTo * 1000);

          return {
            id: workout.id,
            title: workout.title,
            description: workout.description,
            validDays: workout.validDays,
            isPopular: workout.isPopular,
            validFrom: validFromDate,
            validTo: validToDate,
            validFromFormatted: this.formatDate(validFromDate),
            validToFormatted: this.formatDate(validToDate),
            trainingType: workout.trainingType,
            price: workout.price
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
