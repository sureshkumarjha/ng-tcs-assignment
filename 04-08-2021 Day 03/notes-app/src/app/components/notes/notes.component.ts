import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note';
import { NOTE_DATA } from 'src/app/data/mock';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes : Note[];
  noteDetails : Note | undefined;
  constructor() { }

  ngOnInit(): void {
    this.notes = NOTE_DATA;
  }

  setNoteDetails(curNote: Note):void{
    console.log(curNote);
    this.noteDetails = curNote;
  }

}
