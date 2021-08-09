import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AdministerVaccinationsService } from 'src/app/services/administer-vaccinations-service.service';
import { PatientsService } from 'src/app/services/patients-service.service';

@Component({
  selector: 'app-add-vaccination',
  templateUrl: './add-vaccination.component.html',
  styleUrls: ['./add-vaccination.component.css']
})
export class AddVaccinationComponent implements OnInit {

  name : FormControl = new FormControl("",[Validators.required]); 
  dob : FormControl = new FormControl("");
  vaccination : FormControl = new FormControl("",[Validators.required]);
  dateAdministered : FormControl = new FormControl("",[Validators.required,this.validateDate]);
  brandName : FormControl = new FormControl("",[Validators.required]);
  givenAt :  FormControl = new FormControl("",[Validators.required]);

  addVaccinationForm : FormGroup;
  maxDate : string;
  isLoading : boolean;
  errorMessage : string;
  isError : boolean;
  isFormShow : boolean;
  isModalShow : boolean;
  
  constructor(
    private formBuilder : FormBuilder,
    public patientsService : PatientsService,
    public administerVaccinationsService : AdministerVaccinationsService
    ){
    
     this.maxDate = new Date().toISOString().split("T")[0];
     this.isLoading = false;
     this.isError = false;
     this.isFormShow = false;
     this.isModalShow = false;
     this.errorMessage = "";

     this.addVaccinationForm = new FormBuilder().group({
       patientId : this.name,
       dob : this.dob,
       dateAdministered:this.dateAdministered,
       brandName : this.brandName,
       givenAt : this.givenAt,
       vaccination : this.vaccination
     });

    }

    validateNotContainDigit(control:AbstractControl): ValidationErrors | null {
      let check : string = control.value;
      if(check === null){
        return null;
      }
      const found = check.split("").some( r => "0123456789!@#$%^&*()_+[];',./{}|:\\\">?`~".split("").includes(r))
      return found ? { containDigit : true } : null;
    }

    validateDate(control : AbstractControl): ValidationErrors | null{
      if(control.value === null){
        return null;
      }
      let today = new Date();
      let check = new Date(control.value);
      if(check > today){
        return { futureDate: true}
      }    
      return null;
    }

    onChangeName(event : any){
      console.log(event.target.value);
      this.dob.setValue(this.patientsService.patients[event.target.value].dob)
    }

    getName(patientKey:any){
      return this.patientsService.patients[patientKey].firstName + " " + this.patientsService.patients[patientKey].lastName
    }

    onSave(){
      this.isError = false;
      this.isLoading = true;
      console.log(this.addVaccinationForm.value);

      if(!this.addVaccinationForm.valid){

        if(!this.name.valid){
          this.name.markAllAsTouched();
          this.isLoading = false;
          return;
        }
        for(let control in this.addVaccinationForm.controls){
          this.addVaccinationForm.controls[control].markAllAsTouched();
        }
        this.isLoading = false;
      }else{
        
        let date = new Date();

        let req = this.administerVaccinationsService.addVaccinationDetails({
            dateCreated: date.toDateString(),
            ...this.addVaccinationForm.value
        });

        req.subscribe({
            next : (val)=>{
              this.isLoading = false;
              this.isFormShow = false;
              this.isModalShow = true;
              this.administerVaccinationsService.loadVaccinationDetails();
              this.addVaccinationForm.reset();
            },
            error: (error)=>{
              this.isLoading = false;
              this.isError = true;
              this.errorMessage = "Unable to connect to server at this moment."
            }
          }
        )

      }
    }

    onReset(){
      this.isLoading = false;
      this.isError = false;
      this.isFormShow = false;
      this.isModalShow = false;
      this.errorMessage = "";
      this.addVaccinationForm.reset();
    }

  ngOnInit(): void {
    this.patientsService.loadPatients();
    this.administerVaccinationsService.loadVaccinationDetails();
  }

}
