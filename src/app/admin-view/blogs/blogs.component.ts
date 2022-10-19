import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {Blog} from "../../model/blog/blog";
import {BlogsService} from "../../service/blogs.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Blog>;
  dataSource: MatTableDataSource<Blog>;
  selection = new SelectionModel<Blog>(true, []);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'id', 'author', 'title', 'category', 'like', 'comment', 'createAt', 'status', 'action'];
  selected: string = "";
  disableButton = false


  constructor(private blogService: BlogsService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<Blog>;

  }

  ngOnInit(): void {
    this.blogService.findAll().subscribe(value => {
      this.dataSource.data = value.reverse()
      console.log(value)
    })

    this.dataSource.connect()
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
    if (this.selected === "banBlog") {
      this.blogService.findAll().subscribe(value => {
        value = value.filter(function (blog) {
          return !blog.blogStatus.verify
        })
        this.dataSource.data = value;
      })
    } else if (this.selected === "activeBlog") {
      this.blogService.findAll().subscribe(value => {
        value = value.filter(function (blog) {
          return blog.blogStatus.verify
        })
        this.dataSource.data = value;
      })
    } else if (this.selected === "all") {
      this.blogService.findAll().subscribe(value => {
        this.dataSource.data = value;
      })
    } else if (this.selected === "pendingBlog") {
      this.blogService.findAll().subscribe(value => {
        value = value.filter(function (blog) {
          return !blog.blogStatus.confirm
        })
        this.dataSource.data = value;
      })
    }

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
  checkboxLabel(row?: Blog): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${this.dataSource.data.indexOf(row)}`;
  }

  displayBlog() {
    this.blogService.findAll().subscribe(value => {
      this.dataSource.data = value
    })
    console.log(this.dataSource.data)
  }

  banGroupBlog() {
    let blogs = this.selection.selected
    for (const element of blogs) {
      this.blogService.banBlog(element.id).subscribe(result => {
        console.log(result)
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Fail',
          text: error.error.message(),
          timer: 1500
        }).finally(() => {
          return;
        })
      })
    }
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Action complete",
      timer: 1500
    })
    this.selection.clear()
    this.displayBlog()
  }

  activeGroupBlog() {
    let blogs = this.selection.selected
    for (const element of blogs) {
      this.blogService.activeBlog(element.id).subscribe(result => {
        console.log(result)
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Fail',
          text: error.error.message(),
          timer: 1500
        }).finally(() => {
          return;
        })
      })
    }
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: "Action complete",
      timer: 1500
    })
    this.selection.clear()
    this.displayBlog()
  }

  openBlogInfo(blog: Blog) {
    // const dialogRef = this.dialog.open(BlogInfoDialogComponent, {data: blog});
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    window.open("http://localhost:4200/home/blog/" + blog.id)

  }

  openBanBlog(blog: Blog) {

    Swal.fire({
      title: 'Are you sure to ban this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Ban Blog'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.banBlog(blog.id).subscribe(value => {
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
        this.displayBlog()
      }
    })
  }

  openActiveBlog(blog: Blog) {
    Swal.fire({
      title: 'Are you sure to active this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Ban Blog'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.activeBlog(blog.id).subscribe(value => {
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
        this.displayBlog()
      }
    })
  }


  admitBlog(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, admit blog'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.admitBlog(id).subscribe(result => {
          console.log(result)
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: "Action complete",
            timer: 1500
          }).finally(() => {
            this.selected = "all"
            this.applySelect()
          })
        })
      }
    })
  }


}
