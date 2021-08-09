import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { PatientsService } from './services/patients-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(){}
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyAcM8aoBuUG3p_eXGXuKWp0tSAjo0pimjE",
      authDomain: "angular-test-70a6d.firebaseapp.com",
    })
  }
}
