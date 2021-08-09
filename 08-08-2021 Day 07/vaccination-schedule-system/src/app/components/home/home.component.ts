import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isModalShow : boolean;
  modalMsg : string;
  constructor(
    private router: Router,
    private componentCommunicationService : ComponentCommunicationService
    ) {
      this.isModalShow = false;
      this.modalMsg = "";
     }

  ngOnInit(): void {
    let msg = this.componentCommunicationService.getMessage("HomeComponent");
    console.log(msg);
    if(msg !== null){
      if(msg.from === "RegisterUserComponent"){
        this.isModalShow = true;
        this.modalMsg = msg.message.value;
      }
    }
  }


  onCloseModal(){
    this.isModalShow = false;
    this.modalMsg = "";
  }

  onClickAddPatient(){
    this.router.navigate(['register-user'])
  }

  onClickAdministerVaccinations(){
    this.router.navigate(['administer-vaccinations'])
  }

  
}
