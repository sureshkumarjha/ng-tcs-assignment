import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  title : FormControl = new FormControl("Mr");
  firstName : FormControl = new FormControl("",[Validators.required]);
  lastName : FormControl = new FormControl("",[Validators.required]);
  address : FormControl = new FormControl("",[Validators.required]);
  city : FormControl = new FormControl("",[Validators.required]);
  state : FormControl = new FormControl("",[Validators.required]);
  postalCode : FormControl = new FormControl("",[Validators.required,this.validatePostalCode]);
  country: FormControl = new FormControl("",[Validators.required]);
  phone: FormControl = new FormControl("",[Validators.required,this.validatePhone]);
  fax: FormControl = new FormControl("",[Validators.required]);
  email: FormControl = new FormControl("",[Validators.required,Validators.email]);
  paymentBy : FormControl = new FormControl("",[Validators.required]);
  additionalRequests : FormControl = new FormControl("",[Validators.required]);
  termsAndConditions : FormControl = new FormControl(false,[this.checkedTermAndCondition]);
  registerForm : FormGroup;

  isSubmit : boolean;

  constructor() { 
    this.isSubmit = false;

    this.registerForm = new FormBuilder().group({
      title : this.title,
      firstName : this.firstName, 
      lastName : this.lastName,
      address : this.address,
      city : this.city,
      state : this.state,
      postalCode : this.postalCode,
      country : this.country,
      phone : this.phone,
      fax : this.fax,
      email : this.email,
      paymentBy : this.paymentBy,
      additionalRequests : this.additionalRequests,
      termsAndConditions : this.termsAndConditions,
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
    return ((check.toString()).length == 6)? null : { notSixDigits : true };
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
