import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {


  totalQuizMade: number;
  totalQuizFinished: number;
  avgAmountQuestionsPerQuiz: number;
  totalSolvedQuestions: number;
  totalCorrectAnswers: number

  constructor() {
    this.totalQuizMade = 0;
    this.totalQuizFinished = 0;
    this.avgAmountQuestionsPerQuiz = 0;
    this.totalSolvedQuestions = 0;
    this.totalCorrectAnswers = 0;
   }

   incTotalQuizMade(){
    this.totalQuizMade++;
    console.log("totalQuizMade: ", this.totalQuizMade);
   }

   incTotalQuizFinished(){
    this.totalQuizFinished--;
    console.log("totalQuizFinished: ", this.totalQuizFinished);
   }
}
