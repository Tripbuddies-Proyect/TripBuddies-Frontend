import {Component, OnInit} from '@angular/core';
import {Traveller} from "../model/traveller";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataServiceService} from "../../service/data.service.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogBoxInvalidFormComponent} from "../dialog-box-invalid-form/dialog-box-invalid-form.component";

@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit{
  mismatch: boolean = false;
  registered: boolean = false;
  TempTraveller: Traveller;
  userTraveller: any;
  pass: string = '';
  registerForm!: FormGroup;

  constructor(private service: DataServiceService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {
    this.TempTraveller = {} as Traveller;
    this.userTraveller = {} as any;
    this.registerForm = this.formBuilder.group({
      first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
      phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
      email: new FormControl('', { validators:  [Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')], updateOn: 'change' }),
      password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
      password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
    }, { validators: this.MustMatch( 'password', 'password_confirm') }
    );
  }

  ngOnInit(): void {
    //this.setEmailValidation();
    //this.setPhoneValidation();
    //this.setPaswordValidation();
  }

  MustMatch(password: string, passwordConfirm: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const passwordConfirmControl = formGroup.controls[passwordConfirm];

      if (passwordConfirmControl.errors && !passwordConfirmControl.errors['mustMatch']) {
        return;
      }
      if (passwordControl.value !== passwordConfirmControl.value) {
        passwordConfirmControl.setErrors({ MustMatch: true });
      } else {
        passwordConfirmControl.setErrors(null);
      }
    };
  }
  setPaswordValidation() {
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      if (value.length < 8 || value.length > 16) {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16}$')]);
      }
      this.registerForm.get('password')?.updateValueAndValidity();
    });
  }
  /*verifyTravellerUnregistered() {
    this.registered = false;
    var req = new XMLHttpRequest();
    req.open('GET', `http://https://tripbuddies-backend-production.up.railway.app/api/v1/users/searchByEmail/${this.registerForm.get("email")?.value}`, false);
    req.send(null);
    if (req.status == 200) {
      var user = JSON.parse(req.responseText);
      if(user.email == this.registerForm.get("email")?.value){
        this.registered = true;
      }
    }
  }
  */

  setEmailValidation() {
    const emailControl = this.registerForm.get('email');
    //Default validation
    emailControl?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
    this.registerForm.get('email')?.valueChanges.subscribe(value => {
      if (value === 'admin@tripbuddies.com') {
        this.registerForm.get('email')?.setValidators([Validators.required]);
      } else {
        this.registerForm.get('email')?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
      }
      this.registerForm.get('email')?.updateValueAndValidity();
    });

  }
  setPhoneValidation() {
    const phoneControl = this.registerForm.get('phone');
    phoneControl?.setValidators([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]);
    this.registerForm.get('phone')?.valueChanges.subscribe(value => {
      if (value.length < 9 || value.length > 9) {
        this.registerForm.get('phone')?.setValidators([Validators.required, Validators.minLength(9), Validators.maxLength(9)]);
      } else {
        this.registerForm.get('phone')?.setValidators([Validators.required, Validators.pattern('^[0-9]*$')]);
      }
      this.registerForm.get('phone')?.updateValueAndValidity();
    });
  }
  AddTraveller(){
    this.TempTraveller.firstName = this.registerForm.get('first_name')?.value;
    this.TempTraveller.lastName = this.registerForm.get('last_name')?.value;
    this.TempTraveller.phone = this.registerForm.get('phone')?.value;
    this.TempTraveller.email = this.registerForm.get('email')?.value;
    this.TempTraveller.password = this.registerForm.get('password')?.value;
    this.TempTraveller.description =  'I am a traveller';
    this.TempTraveller.role =  'traveller';
    this.TempTraveller.image = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngwing.com%2Fes%2Ffree-png-cnief&psig=AOvVaw2mD8pGhu1N5sS9br3Qv7tq&ust=1695366486882000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLDJkbySu4EDFQAAAAAdAAAAABAE';
    this.TempTraveller.bannerImage = 'https://thumbs.dreamstime.com/b/internet-information-technology-businessman-hand-showing-concept-75784736.jpg';

    var req = new XMLHttpRequest();
    req.open('POST', 'https://tripbuddies-backend-production.up.railway.app/api/v1/travellers', false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(this.TempTraveller));
    console.log('Traveller added successfully!');
  }
  openDialog() {
    if (this.registerForm.invalid) {
      if(this.registerForm.get('password')?.value !== this.registerForm.get('password_confirm')?.value) {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: {message: 'Please confirm the same password!'},
        });
      }
      else{
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: {message: 'Please fill all the required fields!'},
        });
      }
    }
    else {
      //this.verifyTravellerUnregistered();
      if(!this.registered) {
        this.AddTraveller();
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: {message: 'You have registered successfully! You will be redirect to login page to Log In'}
        });
        this.router.navigate(['/login']);
      }
      else {
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: {message: 'This email is already registered!'},
        });
      }
    }
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get first_name() {
    return this.registerForm.get('first_name');
  }
  get password_confirm() {
    return this.registerForm.get('password_confirm');
  }
  get last_name() {
    return this.registerForm.get('last_name');
  }
}
