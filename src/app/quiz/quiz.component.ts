import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Quiz } from '../quiz.model';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';
import { ComponentName } from '../enum';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  quiz: Quiz = new Quiz();
  statistics: Statistics = new Statistics(); //moved from constructor: new Statistics();

  // pagination variables
  startIndex = 0;
  pageSize = 1; // number of questions per page.
  endIndex = this.pageSize; // Initial value based on page size
  currentPage = 1; // Current page number

  protected componentName = ComponentName;

  constructor(private router: Router, private route: ActivatedRoute, private quizzesService: QuizzesService, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.onLoadQuiz(+params.get('quizId')!);
      });

      // pagination initialization
      this.updatePagination();

      // statistics object initialization
      this.onGetStatistics();
  }


  onLoadQuiz(id: number): void {
    this.quizzesService.getQuizById(id).subscribe({
      next: (response: Quiz) => {
        console.log('Quiz Loaded: ', response);
        this.quiz = response;
        this.emptySelectedAnswers();
      },
      error: (error) => console.log('Error while loading the Quiz: ', error)
    });
  }



  // pagination funtionality:
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.endIndex < this.quiz.questions.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  updatePagination() {
    this.startIndex = (this.currentPage - 1);
    this.endIndex = this.startIndex + this.pageSize;
  }


  showResults() {
    this.onUpdateStatistics();

    this.quizzesService.updateQuiz(this.quiz).subscribe(
      (response: Quiz) => {
        console.log("Quiz updated: ", response)
        this.router.navigate(['/quiz', this.quiz.id, 'quiz-results']);
      });

  }

  isAllAnswersSelected(): boolean {
    return this.quiz.questions.every(question => question.selectedAnswer);
  }

  emptySelectedAnswers(): void {
    for(let question of this.quiz.questions){
      question.selectedAnswer = "";
    }
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

    let questionsAmount = this.quiz.questions.length;
    let correctAnswers = 0;

    for (let i = 0; i < this.quiz.questions.length; i++) {

      let question = this.quiz.questions[i];
      if(question.selectedAnswer == question.correctAnswer)
      {
        correctAnswers++;
      }
    }

    this.statistics.totalQuizFinished++;
    this.statistics.totalCorrectAnswers += correctAnswers;
    this.statistics.totalSolvedQuestions += questionsAmount;

    this.statisticsService.updateStatistics(this.statistics).subscribe(
      (response: Statistics) => {
        console.log('statistics.service.updateStatistics() Works!: ', response);
      }
    )
  }

  navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
