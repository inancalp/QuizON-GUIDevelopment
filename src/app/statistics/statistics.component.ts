import { Component } from '@angular/core';
import { Statistics } from '../statistics.model';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  statistics: Statistics = new Statistics();
  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (response: Statistics[]) => {
        console.log('Statistics Loaded: ', response);
        this.statistics = response[0];
      },
      error: (error) => console.log('Error while loading the Quiz: ', error)
    });
  }
}
