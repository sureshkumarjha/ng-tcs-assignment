import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComponentCommunicationService } from 'src/app/services/component-communication.service';
import { PatientsService } from 'src/app/services/patients-service.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  gender : FormControl = new FormControl("",[]);
  firstName : FormControl = new FormControl("",[Validators.required,this.validateNotContainDigit]);
  lastName : FormControl = new FormControl("",[Validators.required,this.validateNotContainDigit]);
  dob : FormControl = new FormControl("",[Validators.required,this.validateDate]);
  placeOfBirth : FormControl = new FormControl("",[this.validateNotContainDigit]);
  bloodGroup : FormControl = new FormControl("",[]);
  height : FormControl = new FormControl("",[Validators.min(0)]);
  weight : FormControl = new FormControl("",[Validators.min(0)]);
  address : FormControl = new FormControl("");
  state : FormControl = new FormControl("");
  postalCode : FormControl = new FormControl("",[this.validatePostalCode]);
  phone: FormControl = new FormControl("",[this.validatePhone]);
  email: FormControl = new FormControl("",[Validators.email]);
  registerForm : FormGroup;
  profile : string;
  isSubmit : boolean;
  isLoading : boolean;
  errorMessage : string;
  isError : boolean;
  maxDate : string;

  stateList : Array<string> = [ "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jammu and Kashmir",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttarakhand",
                "Uttar Pradesh",
                "West Bengal",
                "Andaman and Nicobar Islands",
                "Chandigarh",
                "Dadra and Nagar Haveli",
                "Daman and Diu",
                "Delhi",
                "Lakshadweep",
                "Puducherry"];

  constructor(
    public patientService : PatientsService,
    private router : Router,
    private componentCommunicationService :ComponentCommunicationService
    ) { 
    this.isSubmit = false;
    this.isLoading = false;
    this.isError = false;
    this.errorMessage = "";
    this.maxDate = new Date().toISOString().split("T")[0];

    this.profile = 'https://robohash.org/'+ Math.random() +'.png'

    this.registerForm = new FormBuilder().group({
      gender : this.gender,
      firstName : this.firstName, 
      lastName : this.lastName,
      dob: this.dob,
      placeOfBirth: this.placeOfBirth,
      bloodGroup : this.bloodGroup,
      height : this.height,
      weight : this.weight,
      address : this.address,
      state : this.state,
      postalCode : this.postalCode,
      phone : this.phone,
      email : this.email,
    })
  }

  validateNotContainDigit(control:AbstractControl): ValidationErrors | null {
    let check : string = control.value;
    if(check === null){
      return null;
    }
    const found = check.split("").some( r => "0123456789!@#$%^&*()_+[];',./{}|:\\\">?`~".split("").includes(r))
    return found ? { containDigit : true } : null;
  }

  validatePostalCode(control:AbstractControl): ValidationErrors | null {
    let check : string | null = control.value;
    if (check === null){
      return null;
    }
    check = check.toString();
    if(isNaN(+check)){
      return { notDigit : true }
    }
    return ((check.toString()).length == 6 || check.toString().length == 0)? null : { notSixDigits : true };
  }

  validatePhone(control:AbstractControl): ValidationErrors | null {
    let check : string | null = control.value;
    if (check === null){
      return null;
    }
    check = check.toString();
    if(isNaN(+check)){
      return { notDigit : true }
    }
    return ((check.toString()).length == 10  || check.toString().length == 0 )? null : { notTenDigits : true };
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

  onUpdateProfile(event:any,flag:string){
    this.isError = false;
    if(flag==="firstName" && this.firstName.valid){
    this.profile = 'https://robohash.org/'+event.target.value+" "+this.lastName.value+'.png';
    return;
    }
 
    if(flag==="lastName" && this.lastName.valid){
      this.profile = 'https://robohash.org/'+this.firstName.value+" "+event.target.value+'.png';
      return;
    }
    
  }

  redirectToHome(msg:any){
    if(msg !== null){
      this.componentCommunicationService.putMessage(msg);
    }
    this.router.navigate(['home']);
  }

  onSave(){
    this.isError = false;
    this.isLoading = true;
    if(!this.registerForm.valid){
      for(let control in this.registerForm.controls){
        this.registerForm.controls[control].markAllAsTouched();
        this.isLoading = false;
      }
    }else{
      let date = new Date();
      if(this.patientService.checkUniqueName(this.registerForm.value.firstName+" "+this.registerForm.value.lastName)){
        let req = this.patientService.addPatient({dateCreated: date.toDateString(),...this.registerForm.value});
        req.subscribe({
          next : (val)=>{
            console.log("Submitted")
            this.isSubmit = true;
            this.registerForm.disable();
            window.scroll(0, 0);
            this.isLoading = false;
            this.redirectToHome(    {
              to:"HomeComponent",
              from:"RegisterUserComponent",
              message:{
                value:"Patient added successfully. Enter vaccination details in Administer vaccination"
              }
            })
          },
          error: (error)=>{
            console.log(error);
            this.isLoading = false;
            this.isError = true;
            this.errorMessage = "Unable to connect to server at this moment."
          }
        }
        )
      }else{
        this.isLoading = false;
        this.isError = true;
        this.errorMessage = "Patient Name is already registered."
      }
    }
    
  }

  onCancel(){
    this.isSubmit = false;
    this.registerForm.enable();
    this.registerForm.reset();
    this.redirectToHome(null);
  }

  ngOnInit(): void {
    this.patientService.loadPatients();
  }

}
