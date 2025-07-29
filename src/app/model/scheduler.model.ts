export interface Scheduler {
  id: number;
  max_students: number;
  accupied_slots: number;
  unix_time_start: number;
}

export interface SchedulerList {
  schedulers: Scheduler[];
}
