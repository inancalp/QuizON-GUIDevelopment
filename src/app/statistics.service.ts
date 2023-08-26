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

  getStatistics(): Observable<Statistics[]> {
    const url = 'http://localhost:3000/statistics/';
    return this.http.get<Statistics[]>(url);
  }

  updateStatistics(statistics: Statistics): Observable<Statistics> {
    console.log('statistics.service.statistics Object within updateStatistics(): ', statistics);
    const url = 'http://localhost:3000/statistics/' + statistics.id;
    return this.http.put<Statistics>(url, statistics);
  }
}
