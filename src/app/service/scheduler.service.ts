import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiConfig } from '../config/config';
import { Scheduler, SchedulerList } from '../model/scheduler.model';
import { SchedulerView } from '../model/scheduler.view-model';

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private schedulerURL = ApiConfig.apiUrl + ApiConfig.version + ApiConfig.endpoints.schedulers;

  constructor(private http: HttpClient) {}

  getSchedulers(duration:number=6000): Observable<SchedulerView[]> {
    return this.http.get<SchedulerList>(`${this.schedulerURL}?duration=${duration}`).pipe(
      map((response: SchedulerList) => {
        return response.schedulers.map((scheduler: Scheduler): SchedulerView => {
          const date = new Date(scheduler.unix_time_start * 1000);
          const formatted = this.formatDate(date);
          const availableSlots = scheduler.max_students - scheduler.accupied_slots;
          const isFull = availableSlots <= 0;

          return {
            id: scheduler.id,
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
