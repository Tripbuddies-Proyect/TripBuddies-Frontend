import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DataServiceService} from "../../service/data.service.service";
import {Bussiness} from "../model/bussiness";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {DialogBoxInvalidFormComponent} from "../dialog-box-invalid-form/dialog-box-invalid-form.component";

@Component({
  selector: 'app-bussiness',
  templateUrl: './bussiness.component.html',
  styleUrls: ['./bussiness.component.css']
})
export class BussinessComponent implements OnInit{
  registered:boolean = false;
  Bussiness: Bussiness;
  pass: String = '';
  registerForm!:FormGroup;

  constructor(private service: DataServiceService, private formBuilder:FormBuilder, public dialog:MatDialog, private rooter:Router) {
    this.Bussiness = {} as Bussiness;
    this.registerForm = this.formBuilder.group({
        first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
        email: new FormControl('', { validators:  [Validators.required, Validators.email], updateOn: 'change' }),
        password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
        password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
        company_name: ["", Validators.required],
        ruc: ["", Validators.required],
        owner_name: ["", Validators.required],
        address: ["", Validators.required],
        country: ["", Validators.required],
        city: ["", Validators.required]
      },
      {
        validators: this.MustMatch( 'password', 'password_confirm')
      },
    );
  }

  ngOnInit(): void {
  }
  Add(){
    this.Bussiness.address = this.registerForm.get('address')?.value;
    this.Bussiness.city = this.registerForm.get('city')?.value;
    this.Bussiness.country = this.registerForm.get('country')?.value;
    this.Bussiness.description =  'I am a company';
    this.Bussiness.email =  this.registerForm.get('email')?.value;
    this.Bussiness.firstName =  this.registerForm.get('first_name')?.value;
    this.Bussiness.image = 'https://th.bing.com/th/id/R.feeb8cd8f312940ec0e4c69bb3904182?rik=ilA8Fn%2bVK%2bJ23A&riu=http%3a%2f%2fwww.diasa.com.mx%2fwp-content%2fuploads%2f2016%2f05%2fFondo-Blanco-Plateado-Para-Banner.jpg&ehk=G%2bnzqrPimb866R5mhPcBLtZolFHDH4kIx5cb98of9pY%3d&risl=&pid=ImgRaw&r=0';
    this.Bussiness.lastName =  this.registerForm.get('last_name')?.value;
    this.Bussiness.name=  this.registerForm.get('bussiness_name')?.value;
    this.Bussiness.owner =  this.registerForm.get('owner_name')?.value;
    this.Bussiness.password =  this.registerForm.get('password')?.value;
    this.Bussiness.phone =  this.registerForm.get('phone')?.value;
    this.Bussiness.role =  'bussiness';
    this.Bussiness.ruc =  this.registerForm.get('ruc')?.value;
    this.service.postBussiness(this.Bussiness).subscribe((response:any) => {
      console.log(this.Bussiness);
    });
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
      this.verifyBussinessrUnregistered();
      if(!this.registered) {
        this.Add();
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: {message: 'You have successfully registered!'},
        });
        this.rooter.navigate(['/login']);
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

  get company_name() {
    return this.registerForm.get('bussiness_name');
  }

  get ruc() {
    return this.registerForm.get('ruc');
  }

  get owner_name() {
    return this.registerForm.get('owner_name');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get country() {
    return this.registerForm.get('country');
  }

  get city() {
    return this.registerForm.get('city');
  }
  setEmailValidation() {
    const emailControl = this.registerForm.get('email');
    //Default validation
    emailControl?.setValidators([Validators.required, Validators.email, Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]);
    this.registerForm.get('email')?.valueChanges.subscribe(value => {
      if (value === 'admin@digitalmind.com') {
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



  MustMatch( password: any, password_confirm: any) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const passwordConfirmControl = formGroup.controls[password_confirm];

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
    const passwordControl = this.registerForm.get('password');

    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      if (value.length < 8 || value.length > 16) {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(16)]);
      } else {
        this.registerForm.get('password')?.setValidators([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,16}$')]);
      }
      this.registerForm.get('password')?.updateValueAndValidity();
    });
  }
  verifyBussinessrUnregistered() {
    this.registered = false;
    var req = new XMLHttpRequest();
    req.open('GET', `tripbuddieswebservice-production.up.railway.app/api/v1/users/searchByEmail/${this.registerForm.get("email")?.value}`, false);
    req.send(null);
    if (req.status == 200) {
      var user = JSON.parse(req.responseText);
      if (user.email == this.registerForm.get('email')?.value) {
        this.registered = true;
      }
    }

  }
}
