import { Component, Inject, OnInit } from '@angular/core';
import { Traveller } from "../../../../travellers/models/traveller";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TravellerService } from "../../../services/traveller.service";
import { toInteger } from "lodash";

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationTravellerDialogComponent implements OnInit {
  answer: string = "";
  UserId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<NotificationTravellerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: TravellerService
  ) {}

  ngOnInit(): void {
    this.UserId = toInteger(localStorage.getItem("id"));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendNotification(data: any) {
    let TempAnswer: object = {
      "id": 0,
      "content": "This user did match with you!",
      "date": "2022-11-19T19:53:42.582Z",
      "emitter": {
        "id": this.UserId
      },
      "receiver": {
        "id": data
      }
    };

    this.service.SendNotification(TempAnswer, data, this.UserId).subscribe(response => {
      console.log(response);
    });

    this.answer = "";
  }
}
