import { Quiz } from '../quiz.model';
import { Component, OnInit } from '@angular/core';
import { Question } from '../question.model';
import { OperationType } from '../enum';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {

  // quiz: Quiz = new Quiz();
  // question: Question = new Question();
  protected operationType = OperationType;

  constructor() {}
  ngOnInit(): void {}

}
