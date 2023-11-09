import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Places} from "../../model/places";
import {Review} from "../../../travellers/models/review";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Traveller} from "../../../travellers/models/traveller";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ServiceService} from "../../service/service.service";
import {BussinessComponent} from "../../model/bussiness";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {BusinessComponent} from "../business/business.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Payment} from "../../model/Payment";


@Component({
  selector: 'app-home-bussiness',
  templateUrl: './home-bussiness.component.html',
  styleUrls: ['./home-bussiness.component.css']
})
export class HomeBussinessComponent implements OnInit{
  UserId:any;
  PayAprovade:boolean;
  AddAprovade:boolean;
  constructor(private dialog: MatDialog,private router: Router,private HttpDataServices:ServiceService,private BussinessService:ServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.PlacesData={} as Places;

    this.User={} as BussinessComponent;
    this.Payment={} as Payment;
    this.PayAprovade=false;
    this.AddAprovade=true;
    this.paymentPost = this.formBuilder.group({
      creditCardNumber: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      cvv: ['', [Validators.required]],
      cardHolderName: ['', [Validators.required]],
      mount: ['', [Validators.required]]
    });

    this.placeUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      Date: ['', Validators.required],
      Hour: ['', Validators.required],
    });

    this.placeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      Date: ['', Validators.required],
      Hour: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.UserId = Number(localStorage.getItem('id'));
    console.log(this.UserId)
    this.getAllPlacesbyBussiness(this.UserId);
    this.getUserBussiness(this.UserId);
  }
  PlacesData:Places;
  Placeid:any;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;
  @ViewChild('PayPost') PayPost!: TemplateRef<any>;
  @ViewChild('reviewDialog') reviewDialog!: TemplateRef<any>;
  @ViewChild('PayAceptado') PayAceptado!: TemplateRef<any>;
  @ViewChild('addPlaceDialog') addPlaceDialog!: TemplateRef<any>;
  placeForm: FormGroup;
  placeUpdateForm: FormGroup;
  Payment!:Payment;
  PlaceRow!:Places;
  User:BussinessComponent;
  dataSource=new MatTableDataSource();
  dataSourceReview=new MatTableDataSource();
  displayedColumns:string[]=['name','description','imageUrl','price','origen','destino','date','hour','actions','reviews'];
  displayedColumnsReview:string[]=['FirstName','LastName','PlaceName','imagenurl','Reviews'];
  paymentPost: FormGroup;


  numberValidator(control: FormControl) {
    const value = control.value;
    const valid = /^\d+$/.test(value); // Utiliza una expresión regular para validar que sean números enteros
    return valid ? null : { notANumber: true };
  }


  DeleteButton(element: any){
    this.PlaceRow=element;
    this.HttpDataServices.DeletePlace(element.id).subscribe((response:any)=>{
      this.getAllPlacesbyBussiness(this.UserId);
    });
  }

  OpenReviewsDialog(element:any){
    this.HttpDataServices.GetReviewPlaceId(element.id).subscribe((response:any)=>{
      this.dataSourceReview.data=response;
    })
    this.dialog.open(this.reviewDialog);

  }
  openAddPlaceDialog(){
    this.dialog.open(this.addPlaceDialog);
  }
  onSubmit() {
    if (this.placeForm.valid) {
      const priceValue = this.placeForm.get('price')?.value;
      if (priceValue) {
        const priceNumber = parseFloat(priceValue);
        if (!isNaN(priceNumber)) {
          this.placeForm.patchValue({ price: priceNumber });
        }
      }
      this.PlacesData.date = this.placeForm.get('Date')?.value;
      this.PlacesData.hour = this.placeForm.get('Hour')?.value;
      this.PlacesData.destino = this.placeForm.get('destino')?.value;
      this.PlacesData.origen = this.placeForm.get('origen')?.value;
      this.PlacesData.price = this.placeForm.get('price')?.value;
      this.PlacesData.imageUrl = this.placeForm.get('imageUrl')?.value;
      this.PlacesData.description = this.placeForm.get('description')?.value;
      this.PlacesData.name = this.placeForm.get('name')?.value;
      this.BussinessService.PostPlaces(this.UserId, this.PlacesData).subscribe((response: any) => {
        this.HttpDataServices.PostPayment(this.UserId,response.id, this.Payment).subscribe((response: any) => {
        });
        this.AddAprovade=true;
        this.dialog.closeAll()
        this.getAllPlacesbyBussiness(this.UserId);

      });
    }
  }






  openEditDialog(element:any){
    this.HttpDataServices.GetPlaceByid(element.id).subscribe((response:any)=>{
      this.PlacesData=response;
    });

    this.dialog.open(this.editDialog);
  }
  saveChanges(){

    if (this.placeUpdateForm.valid) {
      this.PlacesData.name = this.placeUpdateForm.get('name')?.value;
      this.PlacesData.description = this.placeUpdateForm.get('description')?.value;
      this.PlacesData.imageUrl = this.placeUpdateForm.get('imageUrl')?.value;
      this.PlacesData.price = this.placeUpdateForm.get('price')?.value;
      this.PlacesData.origen = this.placeUpdateForm.get('origen')?.value;
      this.PlacesData.destino = this.placeUpdateForm.get('destino')?.value;
      this.PlacesData.date = this.placeUpdateForm.get('Date')?.value;
      this.PlacesData.hour = this.placeUpdateForm.get('Hour')?.value;
      this.HttpDataServices.UpdatePlace(this.PlacesData.id,this.PlacesData).subscribe((response: any ) => {
        this.getAllPlacesbyBussiness(this.UserId);
      });
      this.dialog.closeAll();
    }
  }

  closeEditDialog(){
    this.dialog.closeAll();

  }

  getUserBussiness(id:any){
    this.BussinessService.GetBussinessById(id).subscribe((response) => {
      this.User = response;
    })
  }


  getAllPlacesbyBussiness(Bussinessid:number){
    this.HttpDataServices.GetPlaceByBussinessId(Bussinessid).subscribe((response: any) =>{
      this.dataSource.data = response;
    });
  }


  MakePayment() {
    if (this.paymentPost.valid) {
      this.Payment.amount = this.paymentPost.get('mount')?.value;
      this.PayAprovade=true;
      this.AddAprovade=false;
      this.dialog.open(this.PayAceptado);
    }
  }

  CancelPayment() {
    this.dialog.closeAll();
  }

  OpenPaymentDialog() {
    this.dialog.open(this.PayPost);

  }

  closePaymentDialog() {
    this.dialog.open(this.addPlaceDialog);

  }
}
