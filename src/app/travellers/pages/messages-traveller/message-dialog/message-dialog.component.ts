import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {toInteger} from "lodash";
import {TravellerService} from "../../../services/traveller.service";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {
  answer: string = "";
  UserId: number = 0;
  constructor(public dialogRef: MatDialogRef<MessageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private service: TravellerService) { }

  ngOnInit(): void {
    this.UserId = toInteger(localStorage.getItem("id"));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  SendMessage(data: any) {
    let TempAnswer:object = {
      "id":0,
      "message": this.answer,
      "emitter": {
        "id": this.UserId
      },
      "receiver": {
        "id": data
      }
    }

    console.log(this.UserId)
    console.log(data)

    this.service.SendMessage(TempAnswer, data, this.UserId).subscribe(response => {
      console.log(response);
    });

    this.answer = "";

    this.dialogRef.close(data);
  }
}
