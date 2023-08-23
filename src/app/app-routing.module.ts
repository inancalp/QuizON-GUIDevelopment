import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { QuizOnComponent } from './quiz-on/quiz-on.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';

const routes: Routes = [
  //  pathMatch: 'full', otherwise it sees other paths as '' too.
  {path: 'main-page', component: MainPageComponent, pathMatch: 'full'},
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: 'my-notes', component: MyNotesComponent},
  {path: 'quiz-on', component: QuizOnComponent, pathMatch: 'full'},
  {path: 'quiz-on/add-quiz', component: AddQuizComponent},
  {path: 'quiz-on/quiz/:quizId', component: QuizComponent },
  {path: 'quiz-on/quiz/:quizId/quiz-results', component: ResultsComponent},
  {path: 'quiz-on/edit-quiz/:quizId', component: EditQuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
