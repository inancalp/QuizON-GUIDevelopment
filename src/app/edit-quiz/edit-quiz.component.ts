import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuizzesService } from '../quizzes.service';
import { Quiz } from '../quiz.model';
import { Question } from '../question.model';
import { OperationType, ComponentName } from '../enum';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})


export class EditQuizComponent {

  quiz: Quiz = new Quiz();
  initialQuestionAmount = 0;
  protected operationType = OperationType;
  protected componentName = ComponentName;

  constructor(private route: ActivatedRoute, private quizzesService: QuizzesService) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.onLoadQuiz(+params.get('quizId')!);
      });
  }

  onLoadQuiz(id: number): void {
    this.quizzesService.getQuizById(id).subscribe({
      next: (response: Quiz) => {
        console.log('/edit-quiz | Quiz Loaded: ', response);
        this.quiz = response;
        this.initialQuestionAmount = this.quiz.questions.length;
      },
      error: (error) => console.log('Error while loading the Quiz: ', error)
    });
  }

}
