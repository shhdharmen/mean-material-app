import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IConfirmDialogData } from '@appcore/models/confirm-dialog-data';

@Component({
  selector: 'mma-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmDialogData) { }

  ngOnInit() {
  }

  onCancelClick() {
    this.dialogRef.close();
  }

}
