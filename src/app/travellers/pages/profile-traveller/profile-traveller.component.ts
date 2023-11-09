import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Traveller} from "../../models/traveller";
import {TravellerService} from "../../services/traveller.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {BreakpointObserver} from "@angular/cdk/layout";
import {toInteger} from "lodash";
import {delay} from "rxjs";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-profile-traveller',
  templateUrl: './profile-traveller.component.html',
  styleUrls: ['./profile-traveller.component.css']
})
export class ProfileTravellerComponent implements OnInit {

  @ViewChild(MatGridList)
  gridList!: MatGridList;

  @ViewChild('first')
  firstGridTile!: MatGridTile;

  @ViewChild('second')
  secondGridTile!: MatGridTile;
  traveller!: Traveller;
  @ViewChild('editDialog') editDialog!: TemplateRef<any>;

  constructor(
    private observer: BreakpointObserver,
    private service: TravellerService, private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const travellerId = toInteger(localStorage.getItem("id"));
    this.getTraveller(travellerId);
  }
  getTraveller(id: number) {
    this.service.GetTravellerById(id).subscribe((response) => {
      this.traveller = response;
      console.log(this.traveller);
    });
  }

  openEditDialog() {
    this.dialog.open(this.editDialog);
  }

  saveChanges() {
    this.service.UpdateTraveller(this.traveller).subscribe((response: Traveller) => {console.log(response);
    });
    this.dialog.closeAll();
  }

  closeEditDialog() {
    this.dialog.closeAll();
  }
}
