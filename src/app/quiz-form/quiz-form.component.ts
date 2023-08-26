import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../quiz.model';
import { Question } from '../question.model';
import { Statistics } from '../statistics.model';
import { QuizzesService } from '../quizzes.service';
import { Router } from '@angular/router';
import { StatisticsService } from '../statistics.service';
import { OperationType } from '../enum';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent {

  @Input() initialQuestionAmount: number = 0;
  @Input() operationType: OperationType = OperationType.NullType;
  @Input() quiz: Quiz = new Quiz();

  statistics: Statistics = new Statistics();
  question: Question = new Question();
  questionIndexValue: number = 0;
  editClicked: boolean = false;
  questionButtonText: string = "Add the Question";

  questionFilled: boolean = true;
  answerA_filled: boolean = true;
  answerB_filled: boolean = true;
  answerC_filled: boolean = true;
  answerD_filled: boolean = true;
  quizTitle_filled: boolean = true;
  correctAnswer_filled: boolean = true;
  messageIsHidden: boolean = true;
  message: string = "";

  constructor( private quizzesService: QuizzesService, private router: Router, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.onGetStatistics();
  }

  evaluateQuiz(): boolean {

    let result: boolean = true;

    if(this.quiz.questions.length < 3){
      this.message = "At least 3 questions needed.";
      this.messageIsHidden = false;
      result = false;
      return result;
    } else {
      this.messageIsHidden = true;
      result = true;
    }

    if(this.quiz.title.trim() == ""){
      this.quizTitle_filled = false;
      result = false;
    } else {
      this.quizTitle_filled = true;
      result = true;
    }

    return result;
  }

  onSubmit() {

    if(this.evaluateQuiz()) {
      this.messageIsHidden = true;
      switch (this.operationType) {
        case OperationType.EditQuiz:
          this.onEditQuiz();
          break;
        case OperationType.AddQuiz:
          this.onAddQuiz();
          break;
        default:
          break;
      }
    }
  }

  evaluateQuestion(): boolean {

    let result: boolean = true;
    let questionValidation: boolean[] = [];
    let question: string[] = [
      this.question.question,
      this.question.answerA,
      this.question.answerB,
      this.question.answerC,
      this.question.answerD,
      this.question.correctAnswer,
    ];

    for (let i = 0; i < question.length; i++) {
      if(question[i].trim() == "") {
        questionValidation[i] = false;
        result = false;
      } else {
        questionValidation[i]  = true;
        result = true;
      }
    }

    this.questionFilled = questionValidation[0];
    this.answerA_filled = questionValidation[1];
    this.answerB_filled = questionValidation[2];
    this.answerC_filled = questionValidation[3];
    this.answerD_filled = questionValidation[4];
    this.correctAnswer_filled = questionValidation[5];

    if(this.correctAnswer_filled == false ) {
      this.message = "Please select the correct answer.";
      this.messageIsHidden = false;
    } else {
      this.messageIsHidden = true;
    }


    return result;
  }

  appendQuestion() {
    // new question to create new instances within the memory.
    if(this.evaluateQuestion()){
      let newQuestion = new Question();
      this.fillInNewQuestion(newQuestion, this.questionIndexValue);
      this.quiz.questions[this.questionIndexValue] = newQuestion;
      this.activateAddQuestionMode();
      this.clearQuestionObject();
    }
  }





  onEditQuiz() {
    this.quizzesService.updateQuiz(this.quiz).subscribe(
      (response: Quiz) => {
        console.log("Quiz updated: ", response);
        window.alert('Quiz Edited!');

        this.onUpdateStatistics(OperationType.EditQuiz);

      });
  }

  onAddQuiz() {
    this.quizzesService.addQuiz(this.quiz).subscribe({
      next: (response) => {
        console.log('Quiz added: ', response);
        window.alert('Quiz Added!');

        this.onUpdateStatistics(OperationType.AddQuiz);
      },
      error: (error) => console.log('Error while adding Quiz: ', error)
    });
  }


  onUpdateStatistics(operationType: OperationType) {

    switch (operationType) {
      case OperationType.EditQuiz:
        this.statistics.totalQuizEdited++;
        break;
      case OperationType.AddQuiz:
        this.statistics.totalQuizMade++;
        this.statistics.currentQuizAmount++;
        break;
      default:
        break;
    }

    this.statistics.currentAmountQuestions += (this.quiz.questions.length - this.initialQuestionAmount);
    this.statistics.avgAmountQuestionsPerQuiz = (this.statistics.currentAmountQuestions) / (this.statistics.currentQuizAmount);

    if(this.quiz.questions.length > this.initialQuestionAmount) {
      this.statistics.totalQuestionsMade += (this.quiz.questions.length - this.initialQuestionAmount);
    } else {
      this.statistics.totalQuestionsDeleted += -(this.quiz.questions.length - this.initialQuestionAmount);
    }

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

  generateCorrectAnswer(question: Question): string
  {
    switch (question.correctAnswer) {
      case "answerA":
        return question.answerA;
      case "answerB":
        return question.answerB;
      case "answerC":
        return question.answerC;
      case "answerD":
        return question.answerD;
      default:
        return "Something went wrong! No Correct Answers Found.";
    }
  }

  onCancelClicked() {
    this.clearQuestionObject();
    this.activateAddQuestionMode();
  }

  clearQuestionObject() {
    this.question.question = "";
    this.question.answerA = "";
    this.question.answerB = "";
    this.question.answerC = "";
    this.question.answerD = "";
    this.question.correctAnswer = "";
  }

  activateAddQuestionMode() {
    this.editClicked = false;
    this.questionButtonText = "Add the Question";
    this.questionIndexValue = this.quiz.questions.length;
  }



  fillInNewQuestion(newQuestion: Question, questionId: number) {
    newQuestion.question = this.question.question;
    newQuestion.answerA = this.question.answerA;
    newQuestion.answerB = this.question.answerB;
    newQuestion.answerC = this.question.answerC;
    newQuestion.answerD = this.question.answerD;
    newQuestion.id = questionId;
    this.correctAnswerMiddleWare(newQuestion);
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


  onEditQuestionClicked(i: number) {
    this.editClicked = true;
    this.questionButtonText = "Edit the Question";
    this.questionIndexValue = i;

    this.question.question = this.quiz.questions[i].question;
    this.question.answerA = this.quiz.questions[i].answerA;
    this.question.answerB = this.quiz.questions[i].answerB;
    this.question.answerC = this.quiz.questions[i].answerC;
    this.question.answerD = this.quiz.questions[i].answerD;
    this.question.correctAnswer = this.quiz.questions[i].correctAnswer;
  }

  onDeleteClicked(i: number){
    confirm('Are you sure you want to delete this item?');
    this.quiz.questions.splice(i, 1);
  }

}
