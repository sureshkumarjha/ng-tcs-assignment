import { Injectable } from '@angular/core';
import { Patient } from '../model/patient.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { END_POINT } from '../model/endpoint';
@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patients : any;
  isLoadingData : boolean;
  constructor(private httpClient : HttpClient) {
    this.isLoadingData = false;
    this.patients = {};
   }

  addPatient(patient : Patient){
    return this.httpClient.post(
      `${END_POINT}/patients.json`,patient)
  }

  loadPatients(){
    this.isLoadingData = true;
    this.getPatients().subscribe(
      (value : any)=> {
        if(value === null){
          this.isLoadingData = false;
          return ;
        } 
        this.patients = value;
        console.log(value);
        this.isLoadingData = false;
      } 
    )
  }

  getPatients(){
    return this.httpClient.get(`${END_POINT}/patients.json`);
  }

  checkUniqueName(check : string ){
    let names = []
    for(let patient in this.patients){
      let name = this.patients[patient].firstName + " " + this.patients[patient].lastName;
      names.push(name.toLowerCase())
    }
    console.log(names,check);
    return !names.some((ele)=> ele === check.toLowerCase())
  }

}
