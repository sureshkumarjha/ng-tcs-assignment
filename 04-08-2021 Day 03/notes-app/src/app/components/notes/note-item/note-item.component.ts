import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {
  @Input() note:Note;
  @Output() noteClick = new EventEmitter<Note>();
  constructor() { }

  ngOnInit(): void {
  }

  onNoteClick(){
    console.log("Clicked")
    this.noteClick.emit(this.note);
  }

}
