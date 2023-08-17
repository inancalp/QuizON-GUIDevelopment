import { Component } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  statistics: Statistics = new Statistics();
  constructor(private statisticsService: StatisticsService,
    private route: ActivatedRoute,) {}

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
