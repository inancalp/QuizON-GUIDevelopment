import { Injectable } from '@angular/core';
import { Quiz } from './quiz.model';
import { Question } from './question.model';
import { Statistics } from './statistics.model';
import { StatisticsService } from './statistics.service';
import { Router } from '@angular/router';
import { QuizzesService } from './quizzes.service';

@Injectable({
  providedIn: 'root'
})
export class QuizManagementService {

  quiz: Quiz;
  question: Question;
  statistics: Statistics;
  editClicked: boolean;
  questionIndex: number;
  questionButtonText: string;
  initialQuestionAmount: number;

  constructor(private statisticsService: StatisticsService, private router: Router, private quizzesService: QuizzesService) {
    this.quiz = new Quiz();
    this.question = new Question();
    this.statistics = new Statistics();
    this.editClicked = false;
    this.questionIndex = -1;
    this.questionButtonText = "Add the Question";
    this.initialQuestionAmount = 0;
  }

  onLoadQuiz(id: number): void {
    this.quizzesService.getQuizById(id).subscribe({
      next: (response: Quiz) => {
        console.log('/edit-quiz | Quiz Loaded: ', response);
        this.quiz = response;
        this.initialQuestionAmount = this.quiz.questions.length;
        console.log("initialQuestionAmount: ", this.initialQuestionAmount);
        this.emptySelectedAnswers();
      },
      error: (error) => console.log('Error while loading the Quiz: ', error)
    });
  }

  emptySelectedAnswers(): void {
    for(let question of this.quiz.questions){
      question.selectedAnswer = "";
    }
  }

  appendQuestion() {

    let newQuestion = new Question();
    let questionId;

    if(this.editClicked){
      questionId = this.questionIndex;
    }
    else{
      questionId = this.quiz.questions.length;
    }

    newQuestion.question = this.question.question;
    newQuestion.answerA = this.question.answerA;
    newQuestion.answerB = this.question.answerB;
    newQuestion.answerC = this.question.answerC;
    newQuestion.answerD = this.question.answerD;
    newQuestion.id = questionId;

    // fix with Angular Directives later. //
    this.correctAnswerMiddleWare(newQuestion);

    // console.log(newQuestion.correctAnswer);
    this.quiz.questions[questionId] = newQuestion;
    this.editClicked = false;
    this.questionButtonText = "Add the Question";
    this.clearQuestionObject();
  }


  correctAnswerMiddleWare(newQuestion: Question) {
    switch (this.question.correctAnswer) {
      case "answerA":
        newQuestion.correctAnswer = "answerA";
        break;
      case "answerB":
        newQuestion.correctAnswer = "answerB";
        break;
      case "answerC":
        newQuestion.correctAnswer = "answerC";
        break;
      case "answerD":
        newQuestion.correctAnswer = "answerD";
        break;
      default:
        break;
    }
  }

  clearQuestionObject() {
    this.question.question = "";
    this.question.answerA = "";
    this.question.answerB = "";
    this.question.answerC = "";
    this.question.answerD = "";
    this.question.correctAnswer = "";
  }


  onEditClick(i: number){
    this.editClicked = true;
    this.questionIndex = i;
    this.questionButtonText = "Edit the Question";

    this.question.question = this.quiz.questions[i].question;
    this.question.answerA = this.quiz.questions[i].answerA;
    this.question.answerB = this.quiz.questions[i].answerB;
    this.question.answerC = this.quiz.questions[i].answerC;
    this.question.answerD = this.quiz.questions[i].answerD;
    this.question.correctAnswer = this.quiz.questions[i].correctAnswer;
  }

  onDeleteClick(i: number){
    confirm('Are you sure you want to delete this item?');
    this.quiz.questions.splice(i, 1);
  }

  onSubmitEdit()
  {
    // statistics updates for edit-quiz component
    this.statistics.totalQuizEdited++;
    this.statistics.totalQuestionsMade += (this.quiz.questions.length - this.initialQuestionAmount);
    this.statistics.avgAmountQuestionsPerQuiz = (this.statistics.totalQuestionsMade + (this.quiz.questions.length - this.initialQuestionAmount)) / (this.statistics.totalQuizMade + 1);
    this.onEditQuiz();
  }

  onSubmitAdd()
  {
    // statistics updates for add-quiz component
    this.statistics.totalQuizMade++;
    this.statistics.totalQuestionsMade += this.quiz.questions.length;
    this.statistics.avgAmountQuestionsPerQuiz = (this.statistics.totalQuestionsMade + this.quiz.questions.length) / (this.statistics.totalQuizMade + 1);
    this.onAddQuiz();
  }

  clearObjects() {
    //initial states for service objects.
    this.quiz = new Quiz();
    this.question = new Question();
    this.statistics = new Statistics();
    this.editClicked = false;
    this.questionIndex = -1;
    this.questionButtonText = "Add the Question";
    this.initialQuestionAmount = 0;
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
        }
    )
  }

  onEditQuiz() {
    this.quizzesService.updateQuiz(this.quiz).subscribe(
      (response: Quiz) => {
        console.log("Quiz updated: ", response);
        window.alert('Quiz Edited!');

        this.onUpdateStatistics();
        this.clearObjects();
        this.router.navigate(['/quiz-on']);
      });
  }

  onAddQuiz() {
    this.quizzesService.addQuiz(this.quiz).subscribe({
      next: (response) => {
        console.log('Quiz added: ', response);
        window.alert('Quiz Added!');

        this.onUpdateStatistics();
        this.clearObjects();
        this.router.navigate(['/quiz-on']);
      },
      error: (error) => console.log('Error while adding Quiz: ', error)
    });
  }
}
