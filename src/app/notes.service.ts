import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notes } from './notes.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Notes = new Notes();

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Notes[]> {
    const url = 'http://localhost:3000/notes/';
    return this.http.get<Notes[]>(url);
  }

  updateNotes(notes: Notes): Observable<Notes> {
    const url = 'http://localhost:3000/notes/' + notes.id;
    return this.http.put<Notes>(url, notes);
  }

}
