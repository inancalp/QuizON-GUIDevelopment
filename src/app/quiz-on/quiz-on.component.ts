import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizzesService } from '../quizzes.service';

@Component({
  selector: 'app-quiz-on',
  templateUrl: './quiz-on.component.html',
  styleUrls: ['./quiz-on.component.css']
})
export class QuizOnComponent {

  quizzes: Quiz[];


  ngOnInit(): void {
    this.onGetQuizzes();
  }

  constructor(private router: Router, private quizzesService: QuizzesService) {
    this.quizzes = [];
  }

  onAddQuizClicked()
  {
    // console.log("onAddQuizClicked works!");
    this.router.navigate(['/quiz-on/add-quiz']);
  }

  onGetQuizzes(): void {
    this.quizzesService.getQuizzes().subscribe({
      next: (response: Quiz[]) => {
        console.log('Received quizzes: ', response);
        this.quizzes = response;
      },
      error: (error) => console.log('Error: ', error),
      complete: () => console.log('Quizzes ready!')
    });
  }

  navigateToQuiz(quizId: number)
  {
    this.router.navigate(['/quiz-on/quiz', quizId]);
  }
}
