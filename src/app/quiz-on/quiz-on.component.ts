import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from '../quiz.model';
import { QuizzesService } from '../quizzes.service';
import { ComponentName } from '../enum';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';

@Component({
  selector: 'app-quiz-on',
  templateUrl: './quiz-on.component.html',
  styleUrls: ['./quiz-on.component.css']
})
export class QuizOnComponent {

  quizzes: Quiz[] = [];
  statistics: Statistics = new Statistics();
  protected componentName = ComponentName;



  constructor(private router: Router, private quizzesService: QuizzesService, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.onGetQuizzes();
    this.onGetStatistics();
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

  navigateToAddQuiz()
  {
    this.router.navigate(['/add-quiz']);
  }

  navigateToQuiz(quizId: number)
  {
    this.router.navigate(['/quiz', quizId]);
  }

  deleteQuiz(quizId: number) {

    const quiz = this.quizzes.find(quiz => quiz.id == quizId);

    if(quiz) {
      this.statistics.totalQuestionsDeleted += quiz.questions.length;
      this.statistics.currentAmountQuestions -= quiz.questions.length;
      this.statistics.totalQuizDeleted++;
      this.statistics.currentQuizAmount--;

      this.quizzesService.deleteQuiz(quizId).subscribe(
        (response: any) => {
          console.log('Quiz Deleted: ', response);
          this.onUpdateStatistics();
        })
    } else {
      console.log("deleteQuiz(quizId) => can't fint the quiz!");
    }

  }

  editQuiz(quizId: number) {
    this.router.navigate(['/edit-quiz', quizId]);
  }


  deleteClicked(i: number, event: Event)
  {
    //to prevent the click event from spreading to the parent container.
    event.stopPropagation();

    this.quizzes[i].deleteClicked = true;
    setTimeout(() => {
      this.quizzes[i].deleteClicked = false;
      }, this.quizzes[i].deleteTimer);
  }

  onGetStatistics() {
    this.statisticsService.getStatistics().subscribe({
      next: (response: Statistics[]) => {
        console.log('statistics.service.getStatistics() Works!: ', response);
        this.statistics = response[0];
        console.log('statistics.service.statistics Object within onGetStatistics(): ', this.statistics);
      },
      error: (error) => {
        console.log('statistics.service.getStatistics() Does Not Work!: ', error);
      }
    });
  }


  onUpdateStatistics() {

    this.statisticsService.updateStatistics(this.statistics).subscribe(
      (response: Statistics) => {
        console.log('statistics.service.updateStatistics() Works!: ', response);
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
        }
    )
  }
}
