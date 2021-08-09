import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { END_POINT } from '../model/endpoint';

@Injectable({
  providedIn: 'root'
})
export class AdministerVaccinationsService {
  vaccinationDetails:any;
  constructor(private httpClient : HttpClient) { }

  addVaccinationDetails(vaccination : any){
    return this.httpClient.post(
      `${END_POINT}/vaccinationDetails.json`,vaccination);
  }

  getVaccinationDetails(){
    return this.vaccinationDetails;
  }

  loadVaccinationDetails(){
    this.httpClient.get(`${END_POINT}/vaccinationDetails.json`).subscribe(
      (value : any)=> { 
        this.vaccinationDetails = value;
        console.log("Vaccination Details")
        console.log(value);
      } 
    )
  }
  
}
