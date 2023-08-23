import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyNotesComponent } from './my-notes/my-notes.component';
import { QuizOnComponent } from './quiz-on/quiz-on.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { RoundPipe } from './round.pipe';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MyNotesComponent,
    QuizOnComponent,
    AddQuizComponent,
    QuizComponent,
    ResultsComponent,
    RoundPipe,
    EditQuizComponent,
    QuizFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
