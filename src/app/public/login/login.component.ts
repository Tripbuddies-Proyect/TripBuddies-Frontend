import {Component, OnInit} from '@angular/core';
import {DialogBoxInvalidFormComponent} from "../register/dialog-box-invalid-form/dialog-box-invalid-form.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router";
import {DataServiceService} from "../service/data.service.service";
import {Traveller} from "../register/model/traveller";
import {Bussiness} from "../register/model/bussiness";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  userTraveller: Array<any>= [];
  userBussiness: Array<any>= [];

  traveller:Traveller;
  carrier:Bussiness;
  loggedIn = false;
  registered = false;
  logger: string = 'traveller';
  loginForm: FormGroup = this.formBuilder.group({
    email : ["", {validators: [Validators.required, Validators.email], updateOn: 'change'}],
    password : ["", {validators: [Validators.required], updateOn: 'change'}],
  });
  constructor(private formBuilder:FormBuilder, public dialog: MatDialog, private router: Router, private service: DataServiceService){
  this.traveller = {} as Traveller;
  this.carrier = {} as Bussiness;
  }
  ngOnInit(): void {
    this.setEmailValidation();
    this.setPaswordValidation();
    this.service.getTravellersAll().subscribe((data: any) => {
      this.userTraveller = data;
    });
    this.service.getBussinessAll().subscribe((data: any) => {
      this.userBussiness = data;
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  setEmailValidation() {
    const emailControl = this.loginForm.get('email');
    //Default validation
    emailControl?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
    this.loginForm.get('email')?.valueChanges.subscribe((value: any) => {
      if (value === 'admin@tripBuddies.com') {
        this.loginForm.get('email')?.setValidators([Validators.required]);
      } else {
        this.loginForm.get('email')?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
      }
      //this.loginForm.get('email')?.updateValueAndValidity();
    });
  }
  submitForm() {
    console.log(this.loginForm.valid);
    this.loggedIn = true;
  }
  back(): void {
    window.location.href = 'https://tripbuddies-upc.github.io/Landing-Page/';
  }
  setPaswordValidation() {
    this.loginForm.get('password')?.valueChanges.subscribe((value: any) => {
      if (value.length < 8 || value.length > 16) {
        this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.loginForm.get('password')?.setValidators([Validators.required]);
      }
      //this.loginForm.get('password')?.updateValueAndValidity();
    });
  }

  openDialog(): void {
    this.registered = false;
    if (this.loginForm.invalid) {
      if(this.loginForm.get('email')?.value === '' && this.loginForm.get('password')?.value === '') {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: { message: 'Please fill all the required fields'},
        });
      }
      else if(this.loginForm.get('email')?.value === '' && this.loginForm.get('password')?.value !== '') {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: { message: 'Please fill the email field'},
        });
      }
      else {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: { message: 'Please fill the password field'},
        });
      }
    }
    else {
      this.verifyAccount();
    }
  }
  goUserTraveller(id : any) {
    localStorage.setItem("id", id);
    this.router.navigate(['/travellers/home']);
  }

  goUserBussiness(id : any) {
    localStorage.setItem("id", id);
    this.router.navigate(['/bussiness/home']);
  }

  verifyAccount() {
    let email = encodeURIComponent(this.loginForm.get('email')?.value);
    let password = encodeURIComponent(this.loginForm.get('password')?.value);
    if (this.logger === 'traveller') {
      this.service.getTravellerByEmailAndPassword(email, password).subscribe((data: any) => {
        this.traveller = data;
        console.log(data);
        this.goUserTraveller(this.traveller.id);
        this.registered = true;
      });
    }
    else{
      this.service.getCarrierByEmailAndPassword(email, password).subscribe((data: any) => {
        this.carrier = data;
        console.log(data);
        this.goUserBussiness(this.carrier.id);
        this.registered = true;
      });
      }

  }

}
