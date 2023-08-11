export class Question{
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
  selectedAnswer: string;

  constructor()
  {
    this.question = '';
    this.answerA = '';
    this.answerB = '';
    this.answerC = '';
    this.answerD = '';
    this.correctAnswer = '';
    this.selectedAnswer = '';
  }
}
