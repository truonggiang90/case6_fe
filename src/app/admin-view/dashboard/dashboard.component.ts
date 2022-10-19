import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {BlogsService} from "../../service/blogs.service";
import {MatTableDataSource} from "@angular/material/table";
import {Blog} from "../../model/blog/blog";
import {UserInfo} from "../../model/user/userInfo";
import {BlogsOfUser} from "../../model/blog/blogsOfUser";
import {BlogMostLike} from "../../model/blog/blog-most-like";

declare function updateChart1(data: number[]): any
declare function updateChart2(data: number[]): any
declare function updateChartJs(): any
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataSource: MatTableDataSource<BlogsOfUser>;
  listBlogMostLike: BlogMostLike[] | undefined;
  numberUser?: number
  numberUserOnline?: number
  numberBlog?: number;
  numbBlogThisMonth?: number
  displayedColumns = [ 'id', 'author', 'numberPost'];
  listUserPerMonth: Map<number, number> = new Map<number, number>([
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]
  ]);
  listUserToTrans: number[] = []

  listBlogPerMonth: Map<number, number> = new Map<number, number>([
    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0]
  ]);
  listBlogToTrans: number[] = []

  constructor(private userService: UsersService, private blogService: BlogsService) {
    this.blogService.getlistBlogsMostLike().subscribe(result=>{
      this.listBlogMostLike=result
    })

    this.dataSource = new MatTableDataSource<BlogsOfUser>;
    this.blogService.getlistBlogsOfUser().subscribe(result=>{
      this.dataSource.data=result;
    })
    userService.findAll().subscribe(value => {
      this.numberUser = value.length
      let numberUserOnline = 0;
      for (let element of value) {
        if (element.userStatus.status === "ONLINE") {
          numberUserOnline++;
        }
        let registerDate = new Date(element.registerDate)
        let value1 = this.listUserPerMonth.get(registerDate.getMonth())
        // @ts-ignore
        this.listUserPerMonth.set(registerDate.getMonth(), ++value1)
      }

      for (let element of this.listUserPerMonth.values()) {
        this.listUserToTrans.push(element)
      }
      this.numberUserOnline = numberUserOnline;
    })

    blogService.findAll().subscribe(value => {
      let numberBlogThisMonth = 0;
      this.numberBlog = value.length;

      for (let i = 0; i < value.length; i++) {
        let date = new Date(value[i].createAt)
        let dateNow = new Date()
        if (date.getMonth() === dateNow.getMonth()) {
          numberBlogThisMonth++
        }
        let value1 = this.listBlogPerMonth.get(date.getMonth())
        // @ts-ignore
        this.listBlogPerMonth.set(date.getMonth(), ++value1)
      }
      for (let element of this.listBlogPerMonth.values()) {
        this.listBlogToTrans.push(element)
      }
      this.numbBlogThisMonth = numberBlogThisMonth
    })
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const script1 = document.createElement('script');
    script1.src = './assets/adminView/js/main.js';
    document.body.appendChild(script1);
    const script2 = document.createElement('script');
    script2.src = './assets/adminView/vendor/jquery-3.2.1.min.js';
    updateChart1(this.listUserToTrans);
    updateChart2(this.listBlogToTrans);
    // updateChartJs()
  }
}
