import { Component } from '@angular/core';
import {MatTab} from "@angular/material/tabs";
import {MatTableDataSource} from "@angular/material/table";
import {Payment} from "../../model/Payment";
import {Places} from "../../model/places";

@Component({
  selector: 'app-payments-bussiness',
  templateUrl: './payments-bussiness.component.html',
  styleUrls: ['./payments-bussiness.component.css']
})
export class PaymentsBussinessComponent {
  PaymentsDataSource:MatTableDataSource<any>
  Payments:Payment
  displayedColumns:string[]=['name','description','date','price','origen','destino','date','hour','actions','reviews'];


  constructor() {
    this.PaymentsDataSource = new MatTableDataSource<any>
    this.Payments={} as Payment;

  }

  ngOnInit(): void {

  }




}
