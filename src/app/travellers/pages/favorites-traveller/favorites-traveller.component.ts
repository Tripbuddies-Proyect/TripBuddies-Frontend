import {Component, Inject, OnInit} from '@angular/core';
import {TravellerService} from "../../services/traveller.service";
import {Favorite} from "../../models/favorite";
import {toInteger} from "lodash";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageDialogComponent} from "../messages-traveller/message-dialog/message-dialog.component";

@Component({
  selector: 'app-favorites-traveller',
  templateUrl: './favorites-traveller.component.html',
  styleUrls: ['./favorites-traveller.component.css']
})
export class FavoritesTravellerComponent implements OnInit{
  ngOnInit(): void {
  }

}
