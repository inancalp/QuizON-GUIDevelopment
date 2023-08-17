import { Injectable } from '@angular/core';
import { Statistics } from './statistics.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class StatisticsService {

  statistics: Statistics = new Statistics();

  constructor(private http: HttpClient) {}

  // change to the
  getStatistics(): Observable<Statistics[]> {
    const url = 'http://localhost:3000/statistics/';
    return this.http.get<Statistics[]>(url);
  }

  updateStatistics(statistics: Statistics): Observable<Statistics> {
    console.log('statistics.service.statistics Object within updateStatistics(): ', statistics);
    const url = 'http://localhost:3000/statistics/' + statistics.id;
    return this.http.put<Statistics>(url, statistics);
  }




  // updateTotalQuizMade(){
  //   console.log("totalQuizMade-BEFORE: ", this.statistics.totalQuizMade);
  //   this.statistics.totalQuizMade++;
  //   console.log("totalQuizMade-AFTER: ", this.statistics.totalQuizMade);
  //   this.onUpdateStatistics();
  // }


  // updateStatisticsMiddleWare(toUpdate: string)
  // {
  //   switch (toUpdate) {
  //     case "totalQuizMade":
  //       this.statistics.totalQuizMade++;
  //       break;
  //     case "totalQuestionsMade":
  //       // this.statistics.totalQuizMade++;
  //       break;
  //     case "totalQuizFinished":
  //       this.statistics.totalQuizFinished++;
  //       break;
  //     case "avgAmountQuestionsPerQuiz":
  //       this.statistics.avgAmountQuestionsPerQuiz = this.calcAvgAmountQuestionsPerQuiz();
  //       break;
  //     case "totalSolvedQuestions":
  //       this.statistics = "Operation is pending.";
  //       break;
  //     case "totalCorrectAnswers":
  //     this.statistics = "Operation is pending.";
  //     break;
  //     default:
  //       this.statistics = "Unknown status.";
  //       break;
  //   }
  // }


  // calcAvgAmountQuestionsPerQuiz(): number
  // {

  // }

}
