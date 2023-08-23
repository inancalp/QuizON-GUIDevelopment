import { Quiz } from '../quiz.model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from '../question.model';
import { QuizzesService } from '../quizzes.service';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';
import { QuizManagementService } from '../quiz-management.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  // quiz: Quiz;
  // question: Question;
  // statistics: Statistics;
  // editClicked: boolean;
  // questionIndex: number;

  // constructor(private statisticsService: StatisticsService, private router: Router, private route: ActivatedRoute, private quizzesService: QuizzesService) {
  //     this.quiz = new Quiz();
  //     this.question = new Question();
  //     this.statistics = new Statistics();
  //     this.editClicked = false;
  //     this.questionIndex = -1;
  // }

  // ngOnInit(): void {
  //   // this.quiz = history.state.quiz; // Access the passed quiz object
  //   console.log('Received Quiz:', this.quiz);
  //   this.onGetStatistics();
  // }

  constructor(protected quizManagementService: QuizManagementService) {}

  ngOnInit(): void {
    // apply Statistics
    this.quizManagementService.onGetStatistics();
    this.quizManagementService.clearObjects();
  }

  // appendQuestion() {

  //   let newQuestion = new Question();

  //   let questionId;
  //   if(this.editClicked){
  //     questionId = this.questionIndex
  //   }
  //   else{
  //     questionId = this.quiz.questions.length;
  //   }

  //   newQuestion.question = this.question.question;
  //   newQuestion.answerA = this.question.answerA;
  //   newQuestion.answerB = this.question.answerB;
  //   newQuestion.answerC = this.question.answerC;
  //   newQuestion.answerD = this.question.answerD;
  //   newQuestion.id = questionId;

  //   // fix with Angular Directives later. //
  //   this.correctAnswerMiddleWare(newQuestion);

  //   // console.log(newQuestion.correctAnswer);
  //   this.quiz.questions[questionId] = newQuestion;
  //   this.editClicked = false;
  //   this.emptyForm();
  // }


  // correctAnswerMiddleWare(newQuestion: Question) {
  //   switch (this.question.correctAnswer) {
  //     case "answerA":
  //       newQuestion.correctAnswer = "answerA";
  //       break;
  //     case "answerB":
  //       newQuestion.correctAnswer = "answerB";
  //       break;
  //     case "answerC":
  //       newQuestion.correctAnswer = "answerC";
  //       break;
  //     case "answerD":
  //       newQuestion.correctAnswer = "answerD";
  //       break;
  //     default:
  //       break;
  //   }
  // }

  // emptyForm() {
  //   this.question.question = "";
  //   this.question.answerA = "";
  //   this.question.answerB = "";
  //   this.question.answerC = "";
  //   this.question.answerD = "";
  //   this.question.correctAnswer = "";
  // }

  // onEditClick(i: number){
  //   this.editClicked = true;
  //   this.questionIndex = i;

  //   this.question.question = this.quiz.questions[i].question;
  //   this.question.answerA = this.quiz.questions[i].answerA;
  //   this.question.answerB = this.quiz.questions[i].answerB;
  //   this.question.answerC = this.quiz.questions[i].answerC;
  //   this.question.answerD = this.quiz.questions[i].answerD;
  //   this.question.correctAnswer = this.quiz.questions[i].correctAnswer;

  // }

  // onDeleteClick(i: number){
  //   if (confirm('Are you sure you want to delete this item?')){
  //     this.quiz.questions.splice(i, 1);
  //   }
  // }

  // onSubmitClick()
  // {
  //   this.onAddQuiz();

  //   // statistics updates
  //   this.statistics.totalQuizMade++;
  //   this.statistics.totalQuestionsMade += this.quiz.questions.length;
  //   this.statistics.avgAmountQuestionsPerQuiz = (this.statistics.totalQuestionsMade + this.quiz.questions.length) / (this.statistics.totalQuizMade + 1);
  //   this.onUpdateStatistics();

  //   // re-direct
  //   window.alert('Quiz Added!')
  //   this.router.navigate(['/quiz-on']);
  // }

  // onAddQuiz() {
  //   this.quizzesService.addQuiz(this.quiz).subscribe({
  //     next: (response) => {
  //       console.log('Quiz added: ', response);
  //     },
  //     error: (error) => console.log('Error while adding Quiz: ', error)
  //   });
  // }

  // generateCorrectAnswer(question: Question)
  // {
  //   switch (question.correctAnswer) {
  //     case "answerA":
  //       return question.answerA;
  //     case "answerB":
  //       return question.answerB;
  //     case "answerC":
  //       return question.answerC;
  //     case "answerD":
  //       return question.answerD;
  //     default:
  //       return "Something went wrong! No Correct Answers Found.";
  //   }
  // }


  // onGetStatistics() {
  //   this.statisticsService.getStatistics().subscribe({
  //     next: (response: Statistics[]) => {
  //       console.log('statistics.service.getStatistics() Works!: ', response);
  //       this.statistics = response[0];
  //       console.log('statistics.service.statistics Object within onGetStatistics(): ', this.statistics);
  //     },
  //     error: (error) => {
  //       console.log('statistics.service.getStatistics() Does Not Work!: ', error);
  //     }
  //   });
  // }

  // onUpdateStatistics() {
  //   this.statisticsService.updateStatistics(this.statistics).subscribe(
  //     (response: Statistics) => {
  //       console.log('statistics.service.updateStatistics() Works!: ', response);
  //       }
  //   )
  // }
}
