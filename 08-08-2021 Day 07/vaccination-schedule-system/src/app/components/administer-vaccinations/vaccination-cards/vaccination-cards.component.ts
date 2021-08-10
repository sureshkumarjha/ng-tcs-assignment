import { Component, OnInit } from '@angular/core';
import { AdministerVaccinationsService } from 'src/app/services/administer-vaccinations-service.service';

@Component({
  selector: 'app-vaccination-cards',
  templateUrl: './vaccination-cards.component.html',
  styleUrls: ['./vaccination-cards.component.css']
})
export class VaccinationCardsComponent implements OnInit {

  constructor(public administerVaccinationsService : AdministerVaccinationsService) { }

  getProfileUrl(patient : any){
    return `https://robohash.org/${patient.firstName + " " + patient.lastName}.png`
  }

  getAge(date:string){
    let today = new Date()
    let dob = new Date(date);
    let age = Math.floor(( new Date().getTime() - new Date(dob).getTime()) / 3.15576e+10)
    let range = "0-18"
    if(age > 18 && age <= 45){
      range = "18-45"
    }
    if(age > 45){
      range = "45 Above"
    }
    return range+" ("+age.toString()+")"
  }

  calculateDue(date : string){
    let dt = new Date(date);
    dt.setMonth(dt.getMonth() + 3);
    return dt.toLocaleDateString()
  }

  ngOnInit(): void {
  }

}
