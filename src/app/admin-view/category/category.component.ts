import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Blog} from "../../model/blog/blog";
import {SelectionModel} from "@angular/cdk/collections";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category/category";
import {CategoryDTO} from "../../model/category/categoryDTO";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CategoryDTO>;
  dataSource: MatTableDataSource<CategoryDTO>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = [ 'id' ,'picture', 'title'];
  selected: string = "";
  disableButton = false

  constructor(private categoryService:CategoryService, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<CategoryDTO>;
    this.categoryService.findAll().subscribe(value => {
      console.log(value)
      this.dataSource.data = value;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(value => {
      this.dataSource.data = value
    })

    this.dataSource.connect()
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.cd.detectChanges()
  }
}
