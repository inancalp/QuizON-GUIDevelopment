import { Component } from '@angular/core';
import { ComponentName } from '../enum';
import { NotesService } from '../notes.service';
import { Notes } from '../notes.model';
import { Router } from '@angular/router';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {

  protected componentName = ComponentName;
  notes: Notes = new Notes();
  editedNotes: Notes = new Notes();
  editing: boolean = false;

  defaultNotes = `  - Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
  - Aliquam tincidunt mauris eu risus.
  - Vestibulum auctor dapibus neque.
  - Nunc dignissim risus id metus.
  - Cras ornare tristique elit.
  - Vivamus vestibulum ntulla nec ante.
  - Praesent placerat risus quis eros.
  - Fusce pellentesque suscipit nibh.
  - Integer vitae libero ac risus egestas placerat.
  - Vestibulum commodo felis quis tortor.
  - Ut aliquam sollicitudin leo.
  - Cras iaculis ultricies nulla.
  - Donec quis dui at dolor tempor interdum.
  `

  constructor(private notesService: NotesService, private router: Router, private statisticsService: StatisticsService) {}

  statistics: Statistics = new Statistics();

  ngOnInit(): void {
    this.onGetStatistics();
    this.onGetNotes();
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  saveNotes() {
    this.notesMiddleware();
    this.onUpdateNotes();
    this.onUpdateStatistics();
    this.editing = false;
  }

  cancelSaveNotes() {
    this.toggleEdit();
    this.editedNotes.notes = this.notes.notes;
  }



  notesMiddleware(){
    if(this.notes.notes.trim() == ""){
      this.notes.notes = this.defaultNotes;
    }
  }


  onUpdateNotes() {
    this.notesService.updateNotes(this.editedNotes).subscribe(
      (response: Notes) => {
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
      }
    )
  }

  onUpdateStatistics() {
    this.statistics.notesEdited++;

    this.statisticsService.updateStatistics(this.statistics).subscribe(
      (response: Statistics) => {
        console.log('statistics.service.updateStatistics() Works!: ', response);
        this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
        }
    )
  }

  onGetNotes() {
    this.notesService.getNotes().subscribe({
      next: (response: Notes[]) => {
        console.log('Notes Loaded: ', response);
        this.notes = response[0];
        this.notesMiddleware();
        this.editedNotes.notes = this.notes.notes;
        this.editedNotes.id = this.notes.id;
      },
      error: (error) => console.log('Error while loading the Notes: ', error)
    });
  }

  onGetStatistics() {
    this.statisticsService.getStatistics().subscribe({
      next: (response: Statistics[]) => {
        console.log('statistics.service.getStatistics() Works!: ', response);
        this.statistics = response[0];
        console.log('statistics.service.statistics Object within onGetStatistics(): ', this.statistics);
      },
      error: (error) => {
        console.log('statistics.service.getStatistics() Does Not Work!: ', error);
      }
    });
  }
}
