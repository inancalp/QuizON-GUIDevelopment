import { Component } from '@angular/core';
import { Quiz } from '../quiz.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  quiz: Quiz;

  constructor(private router: Router) {
    this.quiz = new Quiz();
  }

  startAddingQuestions() {
    this.router.navigate(['/quiz-on/add-quiz/add-question'], { state: { quiz: this.quiz } });
  }
}
