import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { QuizOnComponent } from './quiz-on/quiz-on.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  //  pathMatch: 'full', otherwise it sees other paths as '' too.
  {path: 'main-page', component: MainPageComponent, pathMatch: 'full'},
  {path: 'my-notes', component: MyNotesComponent},
  {path: 'quiz-on', component: QuizOnComponent},
  {path: 'quiz-on/add-quiz', component: AddQuizComponent},
  {path: 'quiz-on/add-quiz/add-question', component:AddQuestionComponent},
  {path: 'quiz-on/quiz/:quizId', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
