import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz.model';
import { Observable } from 'rxjs';
import { Question } from './question.model';


@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(private http: HttpClient) {}

  addQuiz(quiz: Quiz): Observable<Quiz> {

    const { id, ...quiz_ } = quiz; // needed this code to delete the quizId for being able to generate id for the quiz.
    const url = 'http://localhost:3000/quizzes';
    return this.http.post<Quiz>(url, quiz_);
  }

  getQuizzes(): Observable<Quiz[]> {
    const url = 'http://localhost:3000/quizzes';
    return this.http.get<Quiz[]>(url);
  }

  getQuizById(id: number): Observable<Quiz> {
    const url = 'http://localhost:3000/quizzes/' + id;
    return this.http.get<Quiz>(url);
  }

  // updateSelectedAnswer(selectedAnswer: string, quizId: number, question: {question: Question}): Observable<Quiz> {
  //   console.log(question);
  //   const url = `http://localhost:3000/quizzes/${quizId}/questions`;
  //   return this.http.patch<Quiz>(url, question);
  // }

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    const url = 'http://localhost:3000/quizzes/' + quiz.id;
    return this.http.put<Quiz>(url, quiz);
  }

}
