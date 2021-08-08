import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClickAddPatient(){
    this.router.navigate(['register-user'])
  }

  onClickAdministerVaccinations(){
    this.router.navigate(['administer-vaccinations'])
  }

  
}
