import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Places} from "../../model/places";
import {Review} from "../../../travellers/models/review";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Traveller} from "../../../travellers/models/traveller";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ServiceService} from "../../service/service.service";
import {BussinessComponent} from "../../model/bussiness";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {BusinessComponent} from "../business/business.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";


@Component({
  selector: 'app-home-bussiness',
  templateUrl: './home-bussiness.component.html',
  styleUrls: ['./home-bussiness.component.css']
})
export class HomeBussinessComponent implements OnInit{
  UserId:any;
  constructor(private dialog: MatDialog,private router: Router,private HttpDataServices:ServiceService,private BussinessService:ServiceService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.PlacesData={} as Places;
    this.User={} as BussinessComponent;
    this.placeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.UserId = Number(localStorage.getItem('id'));
    console.log(this.UserId)
    this.getAllPlacesbyBussiness(this.UserId);
    this.getUserBussiness(this.UserId);
  }
  PlacesData:Places;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  @ViewChild('reviewDialog') reviewDialog!: TemplateRef<any>;

  @ViewChild('addPlaceDialog') addPlaceDialog!: TemplateRef<any>;

  placeForm: FormGroup;

  PlaceRow!:Places;
  User:BussinessComponent;
  dataSource=new MatTableDataSource();
  dataSourceReview=new MatTableDataSource();
  displayedColumns:string[]=['id','name','description','location','country','price','imagenurl','actions','reviews'];
  displayedColumnsReview:string[]=['FirstName','LastName','PlaceName','imagenurl','Reviews'];


  UpdateButton(element: any) {
    this.PlaceRow=element;
    this.router.navigate(['/bussiness/places',this.UserId,'update',this.PlaceRow.id]);
  }
  DeleteButton(element: any){
    this.PlaceRow=element;
    this.HttpDataServices.DeletePlace(element.id).subscribe();
    this.getAllPlacesbyBussiness(this.UserId);
  }

  OpenReviewsDialog(element:any){
    this.HttpDataServices.GetReviewPlaceId(element.id).subscribe((response:any)=>{
      console.log(response);
      this.dataSourceReview.data=response;
    })
    this.dialog.open(this.reviewDialog);

  }
  openAddPlaceDialog(){
    this.dialog.open(this.addPlaceDialog);
  }
  onSubmit() {
    if (this.placeForm.valid) {
      const placeData = this.placeForm.value;
      this.BussinessService.PostPlaces(this.UserId, placeData).subscribe((response: any) => {
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
    this.HttpDataServices.UpdatePlace(this.PlacesData).subscribe((response: any ) => {console.log(response);
    });
    this.dialog.closeAll();
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


  delete(id:any){
    this.HttpDataServices.DeletePlace(id).subscribe();
  }

}
