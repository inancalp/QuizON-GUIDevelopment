import { Component, Input } from '@angular/core';
import { ComponentName } from '../enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-button',
  templateUrl: './navigation-button.component.html',
  styleUrls: ['./navigation-button.component.css']
})
export class NavigationButtonComponent {

  protected componentNames = ComponentName;
  @Input() componentName: ComponentName = ComponentName.MainPage;

  // buttonText: string = "";

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToAddQuiz() {
    this.router.navigate(['/add-quiz']);
  }

  navigateToMainPage() {
    this.router.navigate(['/']);
  }
}
