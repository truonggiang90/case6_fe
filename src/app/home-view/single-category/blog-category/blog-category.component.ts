import {Component, Input, OnInit} from '@angular/core';
import {BlogDTO} from "../../../model/blog/blogDTO";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent implements OnInit {
@Input() blogOfCategory:BlogDTO[]=[]
  pipe = new DatePipe('en-US');
  constructor() { }

  ngOnInit(): void {
  }

}
