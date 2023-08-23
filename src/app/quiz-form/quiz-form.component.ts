import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Quiz } from '../quiz.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent {

  @Input() quiz: Quiz = new Quiz();
  @Input() question: Question = new Question();
  @Input() questionButtonText: string = '';
  @Output() appendQuestion = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  appendQuestionEmitter() {
    this.appendQuestion.emit();
  }

  onSubmitEmitter() {
    this.onSubmit.emit();
  }

  onEditClickEmitter(i: number) {
    this.onEditClick.emit(i);
  }

  onDeleteClickEmitter(i: number) {
    this.onDeleteClick.emit(i);
  }

  generateCorrectAnswer(question: Question): string {
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
