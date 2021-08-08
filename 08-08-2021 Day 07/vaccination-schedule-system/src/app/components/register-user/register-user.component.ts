import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  gender : FormControl = new FormControl("",[Validators.required]);
  firstName : FormControl = new FormControl("",[Validators.required]);
  lastName : FormControl = new FormControl("",[Validators.required]);
  dob : FormControl = new FormControl("",[Validators.required]);
  placeOfBirth : FormControl = new FormControl("",[Validators.required]);
  bloodGroup : FormControl = new FormControl("",[Validators.required]);
  height : FormControl = new FormControl("",[Validators.required]);
  weight : FormControl = new FormControl("",[Validators.required]);
  address : FormControl = new FormControl("");
  state : FormControl = new FormControl("");
  postalCode : FormControl = new FormControl("",[this.validatePostalCode]);
  phone: FormControl = new FormControl("",[Validators.required,this.validatePhone]);
  email: FormControl = new FormControl("",[Validators.email]);
  registerForm : FormGroup;
  profile : string;
  isSubmit : boolean;

  constructor() { 
    this.isSubmit = false;

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

  checkedTermAndCondition(control:AbstractControl): ValidationErrors | null {
    let check = control.value;
    return (check)? null : { notAccepted : true };
  }

  validatePostalCode(control:AbstractControl): ValidationErrors | null {
    let check : string | null = control.value;
    console.log(check)
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
    console.log(check)
    if (check === null){
      return null;
    }
    check = check.toString();
    if(isNaN(+check)){
      return { notDigit : true }
    }
    return ((check.toString()).length == 10)? null : { notSixDigits : true };
  }

  onUpdateProfile(event:any){
    if(event.target.value != undefined){
    this.profile = 'https://robohash.org/'+event.target.value+'.png'
    }
  }

  onConfirmCheckout(){
    console.log(this.registerForm.value);
    if(!this.registerForm.valid){
      for(let control in this.registerForm.controls){
        this.registerForm.controls[control].markAllAsTouched()
      }
    }else{
      console.log("Submitted")
      this.isSubmit = true;
      this.registerForm.disable();
      window.scroll(0, 0);
    }
    
  }

  onReset(){
    this.isSubmit = false;
    this.registerForm.enable();
    this.registerForm.reset();
    window.scroll(0, 0);
  }

  ngOnInit(): void {
  }

}
