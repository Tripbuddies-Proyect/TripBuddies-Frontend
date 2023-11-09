import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-box-invalid-form',
  templateUrl: './dialog-box-invalid-form.component.html',
  styleUrls: ['./dialog-box-invalid-form.component.css']
})
export class DialogBoxInvalidFormComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogBoxInvalidFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
