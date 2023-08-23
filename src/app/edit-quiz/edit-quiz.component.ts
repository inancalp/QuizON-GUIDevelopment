import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { QuizzesService } from '../quizzes.service';
import { Quiz } from '../quiz.model';
import { Question } from '../question.model';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';
import { QuizManagementService } from '../quiz-management.service';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})


export class EditQuizComponent {


  constructor(protected quizManagementService: QuizManagementService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.quizManagementService.onLoadQuiz(+params.get('quizId')!);
      });

      // apply Statistics
      this.quizManagementService.onGetStatistics();
  }

}
