import {Question} from './question.model.js';

export class Quiz{
  title: string;
  questions: Question[];
  id: number;
  deleteClicked: boolean;
  deleteTimer: number;

  constructor()
  {
    this.title = '';
    this.questions = [];
    this.id = -1;
    this.deleteClicked = false;
    this.deleteTimer = 1500;
  }
}
