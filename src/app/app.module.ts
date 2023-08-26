import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizOnComponent } from './quiz-on/quiz-on.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import { RoundPipe } from './round.pipe';
import { EditQuizComponent } from './edit-quiz/edit-quiz.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NotesComponent } from './notes/notes.component';
import { MainComponent } from './main/main.component';
import { NavigationButtonComponent } from './navigation-button/navigation-button.component';
import { CharLimitPipe } from './char-limit.pipe';
import { LineBreaksPipe } from './line-breaks.pipe';
import { SvgLogoComponent } from './svg-logo/svg-logo.component';
import { SvgEditComponent } from './svg-edit/svg-edit.component';
import { SvgGoBackComponent } from './svg-go-back/svg-go-back.component';
import { SvgAddComponent } from './svg-add/svg-add.component';
import { SvgDeleteComponent } from './svg-delete/svg-delete.component';
import { SvgWarningComponent } from './svg-warning/svg-warning.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizOnComponent,
    AddQuizComponent,
    QuizComponent,
    ResultsComponent,
    RoundPipe,
    EditQuizComponent,
    QuizFormComponent,
    StatisticsComponent,
    NotesComponent,
    MainComponent,
    NavigationButtonComponent,
    CharLimitPipe,
    LineBreaksPipe,
    SvgLogoComponent,
    SvgEditComponent,
    SvgGoBackComponent,
    SvgAddComponent,
    SvgDeleteComponent,
    SvgWarningComponent,
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
