import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  quiz: Quiz = new Quiz();

  // pagination variables
  startIndex = 0;
  pageSize = 1; // number of questions per page.
  endIndex = this.pageSize; // Initial value based on page size
  currentPage = 1; // Current page number
  //


  constructor(private route: ActivatedRoute, private quizzesService: QuizzesService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.onLoadQuiz(+params.get('quizId')!);
      });


      // pagination initialization
      this.updatePagination();
  }


  onLoadQuiz(id: number): void {
    // console.log('id: ', id);
    this.quizzesService.getQuizById(id).subscribe({
      next: (response: Quiz) => {
        console.log('Quiz Loaded: ', response);
        this.quiz = response;
      },
      error: (error) => console.log('Error while loading the Quiz: ', error)
    });
  }


  // pagination funtionality:
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.endIndex < this.quiz.questions.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  updatePagination() {
    this.startIndex = (this.currentPage - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
  }


  // delete later.
  showScore()
  {

    let questionsAmount = this.quiz.questions.length;
    let correctAnswers = 0;

    for (let i = 0; i < this.quiz.questions.length; i++) {
      const question = this.quiz.questions[i];

      if(question.selectedAnswer == question.correctAnswer)
      {
        correctAnswers++;
      }
      console.log(`Question ${i + 1}: ${question.question}`);
      console.log(`Selected Answer: ${question.selectedAnswer}`);
      console.log(`Correct Answer: ${question.correctAnswer}`);
    }

    console.log(`Score: ${correctAnswers} \ ${questionsAmount}`)


  }

  isAllAnswersSelected(): boolean {
    // every() method iterates through each question's selectedAnswer attribute, and if the attribute returns true for each, every will return true.
    // since inital value for each question is "", if none answer chosen, it will return false.
    return this.quiz.questions.every(question => question.selectedAnswer);
  }

}
