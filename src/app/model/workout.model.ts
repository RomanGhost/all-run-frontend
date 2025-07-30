export interface Workout {
  id: number;
  max_students: number;
  accupied_slots: number;
  unix_time_start: number;
}

export interface WorkoutList {
  workouts: Workout[];
}
