import { TrainingType } from './workout.model';

export interface WorkoutView {
  id: number;
  title: string;
  description: string;
  validDays: number;
  isPopular: boolean;
  validFrom: Date;
  validTo: Date;
  validFromFormatted: string;
  validToFormatted: string;
  trainingType: TrainingType;
  price: number;
}
