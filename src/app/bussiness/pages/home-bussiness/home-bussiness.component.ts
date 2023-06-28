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
  @ViewChild(MatTable)
  table!: MatTable<any>;

  UserId:any;
  constructor(private router: Router,private HttpDataServices:ServiceService,private BussinessService:ServiceService) {
    this.PlacesData={} as Places;
    this.User={} as BussinessComponent;
  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.UserId = Number(localStorage.getItem('id'));
    this.getAllPlacesbyBussiness(this.UserId);
    this.getUserBussiness(this.UserId);
  }
  PlacesData:Places;

  PlaceRow!:Places;
  User:BussinessComponent;
  dataSource=new MatTableDataSource();
  displayedColumns:string[]=['id','name','description','location','country','price','imagenurl','actions'];

  @ViewChild(MatPaginator,{static:true})
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!:MatSort;

  UpdateButton(element: any) {
    this.PlaceRow=element;
    this.router.navigate(['/bussiness/places',this.UserId,'update',this.PlaceRow.id]);
  }
  DeleteButton(element: any){
    this.PlaceRow=element;
    this.HttpDataServices.DeletePlace(element.id).subscribe();
    this.getAllPlacesbyBussiness(this.UserId);

  }

  getUserBussiness(id:any){
    this.BussinessService.GetBussinessById(id).subscribe((response:any)=>{
      this.User=response;
    })
  }
  getAllPlacesbyBussiness(Bussinessid:number){
    this.HttpDataServices.GetPlaceByBussinessId(Bussinessid).subscribe((response: any) =>{
      this.dataSource.data = response;
      console.log(this.dataSource.data)
    });
  }


  delete(id:any){
    this.HttpDataServices.DeletePlace(id).subscribe((response: any) =>{
    });
    location.reload();
  }

}
