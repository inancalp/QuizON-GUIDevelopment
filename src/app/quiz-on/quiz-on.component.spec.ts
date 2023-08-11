import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOnComponent } from './quiz-on.component';

describe('QuizOnComponent', () => {
  let component: QuizOnComponent;
  let fixture: ComponentFixture<QuizOnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizOnComponent]
    });
    fixture = TestBed.createComponent(QuizOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
