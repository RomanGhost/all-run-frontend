import { Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { TrainingCardsComponent } from './component/training-cards/training-cards.component';
import { WorkoutFullInfoComponent } from './component/workout-full-info/workout-full-info.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'All Run - Главная' },
    // { path: 'about-trainer', component: TrainerComponent, title: 'О тренере' },
    // { path: 'about-club', component: ClubComponent, title: 'О клубе' },
    { path: 'register', component: RegisterComponent, title: 'Регистрация' },
    { path: 'workouts', component: TrainingCardsComponent,  title: 'Выбор услуги'},
    { path: 'workout/:id', component: WorkoutFullInfoComponent,  title: 'Просмотр услуги'}
    // { path: '**', redirectTo: '' }
  ];;
