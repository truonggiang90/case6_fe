import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserInfo} from "../../../model/user/userInfo";


@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.css']
})
export class UserInfoDialogComponent implements OnInit {
  highlight(element: UserInfo) {
    element.userStatus.verify = !element.userStatus.verify;
  }

  constructor(
    public dialogRef: MatDialogRef<UserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }



}
