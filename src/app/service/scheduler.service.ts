import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserRegistrationInfo } from '../model/user.model';
import { ApiConfig } from '../config/config';
import { Scheduler, SchedulerList } from '../model/scheduler.model';
import { SchedulerView } from '../model/scheduler.view-model'; 


@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private schedulerURL = ApiConfig.apiUrl + ApiConfig.version + ApiConfig.endpoints.schedulers;

  constructor(private http: HttpClient) {}

  getSchedulerSlots(): Observable<SchedulerView[]> {
    return this.http.get<SchedulerList>(this.schedulerURL).pipe(
      map((response) =>
        response.schedulers.map((s) => {
          const date = new Date(s.unix_time_start * 1000);
          const availableSlots = s.max_students - s.accupied_slots;

          return {
            id: s.id,
            date,
            formatted: date.toLocaleString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
            availableSlots,
            isFull: availableSlots <= 0,
          } as SchedulerView;
        })
      )
    );
  }
}
