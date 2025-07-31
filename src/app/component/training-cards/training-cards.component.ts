import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-training-cards',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './training-cards.component.html',
  styleUrl: './training-cards.component.css'
})
export class TrainingCardsComponent {
cards: any[] = [];
test() {
  console.log("Hello!")
}
}
