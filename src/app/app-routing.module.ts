import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent, pathMatch: 'full'},
  {path: 'add-quiz', component: AddQuizComponent},
  {path: 'quiz/:quizId', component: QuizComponent },
  {path: 'quiz/:quizId/quiz-results', component: ResultsComponent},
  {path: 'edit-quiz/:quizId', component: EditQuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled', // Optional: Enable anchor scrolling
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
