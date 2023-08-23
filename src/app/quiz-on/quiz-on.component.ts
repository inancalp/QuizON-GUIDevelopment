import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizzesService } from '../quizzes.service';

@Component({
  selector: 'app-quiz-on',
  templateUrl: './quiz-on.component.html',
  styleUrls: ['./quiz-on.component.css']
})
export class QuizOnComponent {

  quizzes: Quiz[];

  constructor(private router: Router, private quizzesService: QuizzesService) {
    this.quizzes = [];
  }

  ngOnInit(): void {
    this.onGetQuizzes();
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

  deleteQuiz(quizId: number) {
    confirm('Are you sure you want to delete the Quiz?');
    this.quizzesService.deleteQuiz(quizId).subscribe(
      (response: any) => {
        console.log('Quiz Deleted: ', response);
        this.quizzesService.getQuizzes();
        this.router.navigate(['/quiz-on'])
          // to be able to refresh the page, so deleted quiz is not visible anymore.
          .then(() => {
            window.location.reload();
          });
      }
    )
  }

  editQuiz(quizId: number) {
    this.router.navigate(['/quiz-on/edit-quiz', quizId]);
  }
}
