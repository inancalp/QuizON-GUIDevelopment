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

  quizzes: Quiz[] = [];
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

  answerA_duplicate: boolean = false;
  answerB_duplicate: boolean = false;
  answerC_duplicate: boolean = false;
  answerD_duplicate: boolean = false;

  constructor( private quizzesService: QuizzesService, private router: Router, private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.onGetStatistics();
    this.onGetQuizzes();
    console.log("@ngOnInit() -> this.quiz.questions.length", this.quiz.questions.length);
  }

  // angular triggers this lc-hook whenever change has made to a @Input() property
  ngOnChanges(): void {
    this.questionIndexValue = this.quiz.questions.length;
    console.log("@ngOnChanges() -> this.quiz.questions.length", this.quiz.questions.length);
  }

  evaluateQuestion(): boolean {

    let questionIsValid: boolean = true;
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
      } else {
        questionValidation[i]  = true;
      }
    }

    this.questionFilled = questionValidation[0];
    this.answerA_filled = questionValidation[1];
    this.answerB_filled = questionValidation[2];
    this.answerC_filled = questionValidation[3];
    this.answerD_filled = questionValidation[4];
    this.correctAnswer_filled = questionValidation[5];

    if(this.correctAnswer_filled == false) {
      this.message = "Please select the correct answer.";
      this.messageIsHidden = false;
    } else {
      this.messageIsHidden = true;
    }

    for(let i = 0; i < questionValidation.length; i++) {
      if(questionValidation[i] == false)
      {
        questionIsValid = false;
        return questionIsValid;
      }
    }

    if((this.answerInputsAreSame())) {
      this.message = "Given answers should be different.";
      this.messageIsHidden = false;
      questionIsValid = false;
      return questionIsValid;
    }

    return questionIsValid;
  }


  answerInputsAreSame(): boolean {

    let duplicatesExist = false;

    this.answerA_duplicate = false;
    this.answerB_duplicate = false;
    this.answerC_duplicate = false;
    this.answerD_duplicate = false;

    let answers = [
      {answer: this.question.answerA, "onEvaluation": false, "isDuplicate": this.answerA_duplicate},
      {answer: this.question.answerB, "onEvaluation": false, "isDuplicate": this.answerB_duplicate},
      {answer: this.question.answerC, "onEvaluation": false, "isDuplicate": this.answerC_duplicate},
      {answer: this.question.answerD, "onEvaluation": false, "isDuplicate": this.answerD_duplicate}
    ];

    for(let answerToEvaluate of answers) {
      answerToEvaluate.onEvaluation = true;
      for(let answer of answers) {
        if(!answer.onEvaluation) {
          if (answer.answer == answerToEvaluate.answer) {
            answerToEvaluate.isDuplicate = true;
            answer.isDuplicate = true;
            duplicatesExist = true;
          }
        }
      }
      answerToEvaluate.onEvaluation = false;
    }

    this.answerA_duplicate = answers[0].isDuplicate;
    this.answerB_duplicate = answers[1].isDuplicate;
    this.answerC_duplicate = answers[2].isDuplicate;
    this.answerD_duplicate = answers[3].isDuplicate;

    return duplicatesExist;
  }


  quizTitleAlreadyInUse(): boolean {
    for(let quiz of this.quizzes) {
      if(quiz.title == this.quiz.title && quiz.id != this.quiz.id) {
        return true;
      }
    }
    return false;
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
      return result;
    } else {
      this.quizTitle_filled = true;
      result = true;
    }

    if(this.quizTitleAlreadyInUse()) {
      this.message = "Title is already taken."
      this.messageIsHidden = false;
      result = false;
      return result;
    } else {
      this.messageIsHidden = true;
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



  activateAddQuestionMode() {
    this.editClicked = false;
    this.questionButtonText = "Add the Question";
    this.questionIndexValue = this.quiz.questions.length;
  }

  appendQuestion() {
    // new question to create new instances within the memory.
    if(this.evaluateQuestion()){

      if(!this.editClicked)
        this.statistics.totalQuestionsMade++;

      let newQuestion = new Question();
      this.fillInNewQuestion(newQuestion, this.questionIndexValue);
      this.quiz.questions[this.questionIndexValue] = newQuestion;
      this.activateAddQuestionMode();
      this.clearQuestionObject();
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
    this.evaluateQuestion();
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

    // if(this.quiz.questions.length > this.initialQuestionAmount) {
    //   this.statistics.totalQuestionsMade += (this.quiz.questions.length - this.initialQuestionAmount);
    // } else {
    //   this.statistics.totalQuestionsDeleted += -(this.quiz.questions.length - this.initialQuestionAmount);
    // }

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

    this.questionFilled = true;
    this.answerA_filled = true;
    this.answerB_filled = true;
    this.answerC_filled = true;
    this.answerD_filled = true;

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

    this.answerA_duplicate = false;
    this.answerB_duplicate = false;
    this.answerC_duplicate = false;
    this.answerD_duplicate = false;
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

  deleteClicked(i: number, event: Event)
  {
    //to prevent the click event from spreading to the parent container.
    event.stopPropagation();
    console.log("i when deleteClicked: ", i);
    console.log(" this.quiz.questions[i].deleteTimer: ", i);
    this.quiz.questions[i].deleteClicked = true;

    setTimeout(() => {
      this.quiz.questions[i].deleteClicked = false;
      }, this.quiz.deleteTimer);
  }

  deleteQuestion(i: number) {
    this.quiz.questions.splice(i, 1);

    this.statistics.totalQuestionsDeleted++;

    this.clearQuestionObject();
    this.activateAddQuestionMode();
  }


}
