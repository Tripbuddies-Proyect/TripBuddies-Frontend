import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BussinessComponent} from "../../model/bussiness";
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../service/service.service";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {Traveller} from "../../../travellers/models/traveller";
import {BreakpointObserver} from "@angular/cdk/layout";
import {TravellerService} from "../../../travellers/services/traveller.service";
import {MatDialog} from "@angular/material/dialog";
import {toInteger} from "lodash";
import {BusinessComponent} from "../business/business.component";
import {Bussiness} from "../../../public/register/model/bussiness";

@Component({
  selector: 'app-profile-bussiness',
  templateUrl: './profile-bussiness.component.html',
  styleUrls: ['./profile-bussiness.component.css']
})
export class ProfileBussinessComponent implements OnInit {

  @ViewChild(MatGridList)
  gridList!: MatGridList;

  @ViewChild('first')
  firstGridTile!: MatGridTile;

  @ViewChild('second')
  secondGridTile!: MatGridTile;
  traveller!: Bussiness;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  constructor(
    private observer: BreakpointObserver,
    private service: ServiceService, private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const travellerId = toInteger(localStorage.getItem("id"));
    this.getTraveller(travellerId);
  }
  getTraveller(id: number) {
    this.service.GetBussinessById(id).subscribe((response) => {
      this.traveller = response;
      console.log(this.traveller);
    });
  }

  openEditDialog() {
    this.dialog.open(this.editDialog);
  }

  saveChanges() {
    this.service.UpdateBussiness(this.traveller).subscribe((response: any ) => {console.log(response);
    });
    this.dialog.closeAll();
  }

  closeEditDialog() {
    this.dialog.closeAll();
  }
}
