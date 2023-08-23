
export class Statistics{

  totalQuizMade: number;
  totalQuizEdited: number;
  totalQuestionsMade: number;
  avgAmountQuestionsPerQuiz: number;
  totalQuizFinished: number;
  totalSolvedQuestions: number;
  totalCorrectAnswers: number;
  id: number;

  constructor()
  {
    this.totalQuizMade = 0;
    this.totalQuizEdited = 0;
    this.totalQuestionsMade = 0;
    this.avgAmountQuestionsPerQuiz = 0;
    this.totalQuizFinished = 0;
    this.totalSolvedQuestions = 0;
    this.totalCorrectAnswers = 0;
    this.id = 0;
  }
}
