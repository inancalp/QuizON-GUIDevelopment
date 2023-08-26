
export class Statistics{

  totalQuizMade: number;
  totalQuizEdited: number;
  totalQuestionsMade: number;
  avgAmountQuestionsPerQuiz: number;
  totalQuizFinished: number;
  totalSolvedQuestions: number;
  totalCorrectAnswers: number;
  notesEdited: number;
  totalQuizDeleted: number;
  currentQuizAmount: number;
  totalQuestionsDeleted: number;
  currentAmountQuestions: number;
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
    this.notesEdited = 0;
    this.totalQuizDeleted = 0;
    this.currentQuizAmount = 0;
    this.totalQuestionsDeleted = 0;
    this.currentAmountQuestions = 0;
    this.id = 0;
  }
}
