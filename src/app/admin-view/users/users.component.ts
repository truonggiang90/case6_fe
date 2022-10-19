import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {UserInfo} from "../../model/user/userInfo";
import {UsersService} from "../../service/users.service";
import {SelectionModel} from "@angular/cdk/collections";

import {MatDialog} from "@angular/material/dialog";
import {UserInfoDialogComponent} from "./user-info-dialog/user-info-dialog.component";
import {MatSelectChange} from "@angular/material/select";
import {animate, state, style, transition, trigger} from "@angular/animations";
import Swal from "sweetalert2";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserInfo>;
  dataSource: MatTableDataSource<UserInfo>;
  selection = new SelectionModel<UserInfo>(true, []);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'avatar', 'name', 'email', 'phoneNumber', 'status', 'role', 'action'];
  selected: string = "";

  disableButton = false

  constructor(private userService: UsersService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<UserInfo>;
    this.userService.findAll().subscribe(value => {
      this.dataSource.data = value;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cd.detectChanges()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applySelect() {

    if (this.selected === "banUser") {
      this.userService.findAll().subscribe(value => {
        value = value.filter(function (userInfo) {
          return !userInfo.userStatus.verify
        })
        this.dataSource.data = value;
      })
    } else if (this.selected === "activeUser") {
      this.userService.findAll().subscribe(value => {
        value = value.filter(function (userInfo) {
          return userInfo.userStatus.verify
        })
        this.dataSource.data = value;
      })
    } else if (this.selected === "all") {
      this.userService.findAll().subscribe(value => {
        this.dataSource.data = value;
      })
    }
  }


  ngOnInit(): void {
    this.userService.findAll().subscribe(value => {
      console.log(value)
      this.dataSource.data = value
    })
    this.dataSource.connect()

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserInfo): string {

    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.dataSource.data.indexOf(row)}`;
  }

  displayUser() {
    this.userService.findAll().subscribe(value => {
      this.dataSource.data = value

    })
  }

  checkRole(role: string): boolean {
    return role === "ROLE_ADMIN";
  }

  checkStatus(status: boolean): boolean {
    document.getElementById("")
    return status;
  }

  openUserInfo(userInfo: UserInfo) {
    const dialogRef = this.dialog.open(UserInfoDialogComponent, {data: userInfo});
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.displayUser()
    });
  }

  openBanUser(userInfo: UserInfo) {
    Swal.fire({
      title: 'Are you sure to ban this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Ban Blog'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.banUser(userInfo.id).subscribe(value => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Action complete",
            timer: 1500
          })
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Fail',
            text: error.error.message(),
            timer: 1500
          })
        })
        this.selection.clear()
        this.displayUser()
      }
    })
  }


  openActiveUser(userInfo: UserInfo) {
    Swal.fire({
      title: 'Are you sure to active this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Ban Blog'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.activeUser(userInfo.id).subscribe(value => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Action complete",
            timer: 1500
          })
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Fail',
            text: error.error.message(),
            timer: 1500
          })
        })
        this.selection.clear()
        this.displayUser()
      }
    })
  }


  banGroupUser() {
    let userInfo = this.selection.selected
    for (const element of userInfo) {
      this.userService.banUser(element.id).subscribe(compileResults => {
        console.log(compileResults)
      })
    }
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Ban User Group Complete",
      timer: 1500
    })
    this.selection.clear()
    this.displayUser()
  }

  activeGroupUser() {
    let userInfo = this.selection.selected
    for (const element of userInfo) {
      this.userService.activeUser(element.id).subscribe(compileResults => {
        console.log(compileResults)
      })
    }
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Active User Group Complete",
      timer: 1500
    })
    this.selection.clear()
    this.displayUser()
  }

}


