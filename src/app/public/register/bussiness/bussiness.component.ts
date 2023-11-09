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
export class BussinessComponent implements OnInit {

  registered: boolean = false;
  TempComp: Bussiness;
  pass:string = "";
  registerForm!: FormGroup;

  constructor(private service: DataServiceService, private formBuilder: FormBuilder, public dialog: MatDialog, private router: Router) {

    this.TempComp = {} as Bussiness;

    this.registerForm = this.formBuilder.group({
        first_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        last_name: new FormControl('', { validators:  [Validators.required], updateOn: 'change' }),
        phone:new FormControl('', { validators:  [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern('^[0-9]*$')], updateOn: 'change' }),
        email: new FormControl('', { validators:  [Validators.required, Validators.email], updateOn: 'change' }),
        password: new FormControl('', { validators:  [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
        password_confirm: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(16)], updateOn: 'change' }),
        Marca_name: ["", Validators.required],
        ruc_name: ["", Validators.required],
        Plate_name: ["", Validators.required],
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
   //this.setEmailValidation();
   //this. setPhoneValidation();
   //this.setPaswordValidation();
  }

  Add(){
    this.TempComp.address = this.registerForm.get('address')?.value;
    this.TempComp.bannerImage = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fskydatalatam.com%2Fblog%2Ftransportista-como-influyen-para-planificar-rutas%2F&psig=AOvVaw3xG1XlZVpq797Ee3xhRl0e&ust=1695361231020000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKC70vf-uoEDFQAAAAAdAAAAABAI';
    this.TempComp.city = this.registerForm.get('city')?.value;
    this.TempComp.country = this.registerForm.get('country')?.value;
    this.TempComp.description =  'I am a carrier';
    this.TempComp.email =  this.registerForm.get('email')?.value;
    this.TempComp.firstName =  this.registerForm.get('first_name')?.value;
    this.TempComp.image = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fes%2Fpng-ecndy&psig=AOvVaw2mD8pGhu1N5sS9br3Qv7tq&ust=1695366486882000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLDJkbySu4EDFQAAAAAdAAAAABAJ';
    this.TempComp.lastName =  this.registerForm.get('last_name')?.value;
    this.TempComp.password =  this.registerForm.get('password')?.value;
    this.TempComp.phone =  this.registerForm.get('phone')?.value;
    this.TempComp.role =  'carrier';
    this.TempComp.ruc =  this.registerForm.get('ruc_name')?.value;
    this.TempComp.Plate =  this.registerForm.get('Plate_name')?.value;
    this.TempComp.Marca =  this.registerForm.get('Marca_name')?.value;



    this.service.postBussiness(this.TempComp).subscribe((response:any) => {console.log(response)});
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
      //this.verifyDeveloperUnregistered();
      if(!this.registered) {
        this.Add();
        this.dialog.open(DialogBoxInvalidFormComponent, {
          data: {message: 'You have successfully registered!'},
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

  get company_name() {
    return this.registerForm.get('company_name');
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
  verifyDeveloperUnregistered() {
    this.registered = false;
    var req = new XMLHttpRequest();
    req.open('GET', `https://tripbuddies-backend-production.up.railway.app/api/v1/users/searchByEmail/${this.registerForm.get("email")?.value}`, false);
    req.send(null);
    if (req.status == 200) {
      var user = JSON.parse(req.responseText);
      if (user.email == this.registerForm.get('email')?.value) {
        this.registered = true;
      }
    }

  }
}
