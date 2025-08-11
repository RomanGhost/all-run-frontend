import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { WorkoutListComponent } from "../view/workout-list/workout-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, WorkoutListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  galleryImages = [
    { url: "assets/images/command_people.jpg", alt: "Группа спортсменов" },
    { url: "assets/images/photo_medal_woman.jpg", alt: "Женщина с медалью" },
    { url: "assets/images/time_to_life_man.jpg", alt: "время жить!" },
    { url: "assets/images/woman_man_photo.jpg", alt: "Мужчина и женщина" },
    { url: "assets/images/woman_medal_woman.jpg", alt: "женщина с медалью" },
  ]

  ngOnInit() {
  }

  goToAllWorkouts() {
    this.router.navigate(['/workouts']);
  }
}
