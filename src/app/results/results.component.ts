import { Component } from '@angular/core';
import { Quiz } from '../quiz.model';
import { QuizzesService } from '../quizzes.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Question } from '../question.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  quiz: Quiz = new Quiz();

  constructor(private quizzesService: QuizzesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.onLoadResults(+params.get('quizId')!);
      });
  }

  onLoadResults(id: number): void {
    this.quizzesService.getQuizById(id).subscribe({
      next: (response: Quiz) => {
        console.log('Results Loaded: ', response);
        this.quiz = response;
      },
      error: (error) => console.log('Error while loading the Results: ', error)
    });
  }


  totalCorrectAnswers(): number {
    let totalCorrectAnswers = 0;
    for(let question of this.quiz.questions){
      if(question.selectedAnswer == question.correctAnswer){
        totalCorrectAnswers++;
      }
    }
    return totalCorrectAnswers;
  }

  selectedAnswer(question: Question): string {
    switch (question.selectedAnswer) {
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

  correctAnswer(question: Question): string {
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

  isWrongAnswer(question: Question): boolean {
    return question.selectedAnswer != question.correctAnswer ? true : false;
  }
}
