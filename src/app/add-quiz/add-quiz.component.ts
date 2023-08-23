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

  constructor(protected quizManagementService: QuizManagementService) {}

  ngOnInit(): void {
    // apply Statistics
    this.quizManagementService.onGetStatistics();
    this.quizManagementService.clearObjects();
  }

}
