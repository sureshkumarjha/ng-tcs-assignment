import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteItemComponent } from './components/notes/note-item/note-item.component';
import { NoteDetailComponent } from './components/notes/note-detail/note-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotesComponent,
    NoteItemComponent,
    NoteDetailComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
