import {Question} from './question.model.js';

export class Quiz{
  title: string;
  courseName: string;
  questions: Question[];
  id: number;
  constructor()
  {
    this.title = '';
    this.courseName = '';
    this.questions = [];
    this.id = -1;
  }
}
