// src/app/service/workout.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiConfig } from '../config/config';
import { Workout, WorkoutList } from '../model/workout.model';
import { WorkoutView } from '../model/workout.view-model';
import { UserInfo } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workoutURL = ApiConfig.apiUrl + ApiConfig.version + ApiConfig.endpoints.workout;

  constructor(private http: HttpClient) {}

  // Надёжный метод getById с fallback по url и маппингом в WorkoutView
  getWorkoutById(id: number): Observable<WorkoutView> {
    const url1 = `${this.workoutURL}/get/${id}`; // если у тебя такой маршрут

    return this.http.get<any>(url1).pipe(
      // map для приведения ответа к WorkoutView
      map((res: any) => {
        const raw: Workout = res.workout ?? res;
        return this.toView(raw);
      }),
      catchError(err => {
        console.error('getWorkoutById error:', err);
        return throwError(() => err);
      })
    );
  }

  getWorkouts(): Observable<WorkoutView[]> {
    return this.http.get<WorkoutList>(`${this.workoutURL}/all`).pipe(
      map((response: WorkoutList) => {
        console.log("Get data from server")
        return response.workoutList.map((workout: Workout): WorkoutView => {
          return this.toView(workout)
        });
      })
    );
  }

  // Преобразует "сырую" модель в view-модель для компонента
  private toView(w: Workout): WorkoutView {
    const validFromDate = w.validFrom ? new Date((w.validFrom as unknown as number) * 1000) : null;
    const validToDate = w.validTo ? new Date((w.validTo as unknown as number) * 1000) : null;

    return {
      id: w.id,
      title: w.title,
      description: w.description,
      instructor: w.instructor as UserInfo,
      price: w.price/100,
      validDays: w.validDays,
      isPopular: w.isPopular,
      validFrom: validFromDate ?? undefined,
      validTo: validToDate ?? undefined,
      validFromFormatted: validFromDate ? this.formatDate(validFromDate) : '',
      validToFormatted: validToDate ? this.formatDate(validToDate) : '',
      trainingType: (w as any).trainingType
    } as WorkoutView;
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
