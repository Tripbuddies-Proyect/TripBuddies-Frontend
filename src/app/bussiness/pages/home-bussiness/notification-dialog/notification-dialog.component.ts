import {Component, OnInit} from '@angular/core';
import {Traveller} from "../../../../travellers/models/traveller";

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit{
    Travel: Array<Traveller> = []
    constructor() {
    }

    ngOnInit(): void {
    }

}
