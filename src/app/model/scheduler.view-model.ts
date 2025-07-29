export interface SchedulerView {
  id: number;
  date: Date;
  formatted: string; // "29.07.2025 19:00"
  availableSlots: number;
  isFull: boolean;
}
