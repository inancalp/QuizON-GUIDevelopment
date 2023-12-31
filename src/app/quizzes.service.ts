import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quiz } from './quiz.model';
import { Observable } from 'rxjs';


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

  updateQuiz(quiz: Quiz): Observable<Quiz> {
    const url = 'http://localhost:3000/quizzes/' + quiz.id;
    return this.http.put<Quiz>(url, quiz);
  }

  deleteQuiz(quizId: number): Observable<any> {
    const url = 'http://localhost:3000/quizzes/' + quizId;
    return this.http.delete(url);
  }
}
