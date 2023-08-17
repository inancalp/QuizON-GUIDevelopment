
export class Statistics{

  totalQuizMade: number;
  totalQuestionsMade: number;
  avgAmountQuestionsPerQuiz: number;
  totalQuizFinished: number;
  totalSolvedQuestions: number;
  totalCorrectAnswers: number;
  successRatio: number;
  id: number;

  constructor()
  {
    this.totalQuizMade = -1;
    this.totalQuestionsMade = -1;
    this.avgAmountQuestionsPerQuiz = -1;
    this.totalQuizFinished = -1;
    this.totalSolvedQuestions = -1;
    this.totalCorrectAnswers = -1;
    this.successRatio = -1;
    this.id = -1;
  }
}
