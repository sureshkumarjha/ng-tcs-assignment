import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/model/note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css']
})
export class NoteDetailComponent implements OnInit {
  @Input() noteDetails : Note;
  constructor() { }

  ngOnInit(): void {
  }

}
