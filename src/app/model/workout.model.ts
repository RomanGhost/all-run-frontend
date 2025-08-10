export interface Workout {
  id: number;
  title: string;
  description: string;
  validDays: number;
  isPopular: boolean;
  validFrom: number;
  validTo: number;
  trainingType: TrainingType;
  price: number;
}

export interface TrainingType {
    name: string;
};

export interface WorkoutList {
  workoutList: Workout[]
}
