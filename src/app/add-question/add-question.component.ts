import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from '../quiz.model';
import { Question } from '../question.model';
import { QuizzesService } from '../quizzes.service';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  quiz: Quiz;
  question: Question;
  correctAnswer: string;

  constructor(private route: ActivatedRoute, private quizzesService: QuizzesService) {
    this.quiz = new Quiz();
    this.question = new Question();
    this.correctAnswer = '';
  }

  ngOnInit(): void {
    this.quiz = history.state.quiz; // Access the passed quiz object
    console.log('Received Quiz:', this.quiz);
  }

  appendQuestion() {

    let newQuestion = new Question();

    const questionId = this.quiz.questions.length;

    newQuestion.question = this.question.question;
    newQuestion.answerA = this.question.answerA;
    newQuestion.answerB = this.question.answerB;
    newQuestion.answerC = this.question.answerC;
    newQuestion.answerD = this.question.answerD;
    newQuestion.id = questionId;

    // fix with Angular Directives later. //
    this.correctAnswerMiddleWare(newQuestion);

    // console.log(newQuestion.correctAnswer);
    this.quiz.questions.push(newQuestion);
  }

  addQuestion() {
    this.appendQuestion();
  }

  correctAnswerMiddleWare(newQuestion: Question) {
    if(this.correctAnswer == "answerA"){newQuestion.correctAnswer = "answerA";}
    if(this.correctAnswer == "answerB"){newQuestion.correctAnswer = "answerB";}
    if(this.correctAnswer == "answerC"){newQuestion.correctAnswer = "answerC";}
    if(this.correctAnswer == "answerD"){newQuestion.correctAnswer = "answerD";}
  }


  onEditClick(i: number){

    // this.onDeleteClick(i);
  }

  onDeleteClick(i: number){
    if (confirm('Are you sure you want to delete this item?')){
      this.quiz.questions.splice(i, 1);
    }
  }

  onSubmitClick()
  {
    // store quiz:
    // console.log("onSubmitWorks!");
    this.quizzesService.addQuiz(this.quiz).subscribe({
      next: (response) => {
        console.log('Quiz added: ', response);
      },
      error: (error) => console.log('Error while adding Quiz: ', error)
    });
  }


  generateCorrectAnswer(question: Question)
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

}
