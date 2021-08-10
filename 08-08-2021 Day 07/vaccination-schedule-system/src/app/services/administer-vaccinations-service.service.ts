import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { END_POINT } from '../model/endpoint';
import { PatientsService } from './patients-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdministerVaccinationsService {
  vaccinationDetails:any;
  hospitalList: any;
  patientsVaccinationDetails : any;
  patientsVacDetailsList : any;
  isLoadingData : boolean;
  nameToggle : boolean;
  ageToggle : boolean;
  givenOn : boolean;
  brandName : boolean;

  constructor(
    private httpClient : HttpClient,
    private patientsService : PatientsService
    ) {
    this.hospitalList = [];
    this.patientsVaccinationDetails = {};
    this.patientsVacDetailsList = [];
    this.isLoadingData = false;
    this.nameToggle = true;
    this.ageToggle = true;
    this.givenOn = false;
    this.brandName = false;
  }

  addVaccinationDetails(vaccination : any){
    return this.httpClient.post(
      `${END_POINT}/vaccinationDetails.json`,vaccination);
  }

  getVaccinationDetails(){
    return this.vaccinationDetails;
  }

  loadVaccinationDetails(){
    this.isLoadingData = true;
    this.httpClient.get(`${END_POINT}/vaccinationDetails.json`).subscribe(
      (value : any)=> { 
        if(value !== null){
          this.vaccinationDetails = value;
        }
        console.log("Vaccination Details")
        console.log(value);
        this.loadHospitalList();
        console.log(this.hospitalList);
        this.loadPatientsWithVaccinationDetails();
      } 
    )
  }

  loadHospitalList(){
    let hospitals = new Set();
    for(let vaccineId in this.vaccinationDetails){
      hospitals.add(this.vaccinationDetails[vaccineId].givenAt)
    }
    this.hospitalList = Array.from(hospitals)
  }

  loadPatientsWithVaccinationDetails(){
    let req = this.patientsService.getPatients();
    req.subscribe(
      (patients : any)=>{
        for(let vaccineId in this.vaccinationDetails){
          if(typeof(patients[this.vaccinationDetails[vaccineId].patientId]) !== typeof(undefined)){
            patients[this.vaccinationDetails[vaccineId].patientId][this.vaccinationDetails[vaccineId].vaccination] = this.vaccinationDetails[vaccineId]
          }
        }
        this.patientsVaccinationDetails = patients;
        this.patientsVacDetailsList = Object.values(patients);
        this.patientsVacDetailsList.sort(( a:any, b:any ) => (a.firstName + " " + a.lastName).localeCompare((b.firstName + " " + b.lastName)) || Math.floor(( new Date().getTime() - new Date(b.dob).getTime()) / 3.15576e+10) - Math.floor(( new Date().getTime() - new Date(a.dob).getTime()) / 3.15576e+10) )
        this.isLoadingData = false;
      },
      (error)=>{
        console.log(error)
      }
    )

  }

  sortpatientsVacDetailsList(key :string){
    
    if(key === "name"){
      this.nameToggle = !this.nameToggle;
      this.patientsVacDetailsList.sort(( a:any, b:any ) => 
      (this.nameToggle)? 
      (a.firstName + " " + a.lastName).localeCompare((b.firstName + " " + b.lastName)) : 
      (b.firstName + " " + b.lastName).localeCompare((a.firstName + " " + a.lastName))
      )
      return;
    }
    if(key === "age"){
      this.ageToggle = !this.ageToggle;
      this.patientsVacDetailsList.sort(( a:any, b:any ) => 
      (this.ageToggle)? Math.floor(( new Date().getTime() - new Date(b.dob).getTime()) / 3.15576e+10) - Math.floor(( new Date().getTime() - new Date(a.dob).getTime()) / 3.15576e+10) : 
      Math.floor(( new Date().getTime() - new Date(a.dob).getTime()) / 3.15576e+10) - Math.floor(( new Date().getTime() - new Date(b.dob).getTime()) / 3.15576e+10)
      )
      return;
    }
    if(key === "givenOn"){
      this.givenOn = !this.givenOn;
      this.patientsVacDetailsList.sort(( a:any, b:any ) => 
      (this.givenOn)? 
      ( b["1"]? b["1"].dateAdministered : " " ).localeCompare(( a["1"]? a["1"].dateAdministered : " ")) :
      ( a["1"]? a["1"].dateAdministered : " " ).localeCompare(( b["1"]? b["1"].dateAdministered : " "))  
      )
      return;
    }
    if(key === "brand"){
      this.brandName = !this.brandName;
      this.patientsVacDetailsList.sort(( a:any, b:any ) => 
      (this.brandName)? 
      ( a["1"]? a["1"].brandName : " " ).localeCompare(( b["1"]? b["1"].brandName : " ")):
      ( b["1"]? b["1"].brandName : " " ).localeCompare(( a["1"]? a["1"].brandName : " ")) 
      )
      return;
    }
  }

}
