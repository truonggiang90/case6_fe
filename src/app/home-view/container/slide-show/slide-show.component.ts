import { Component, OnInit } from '@angular/core';
import {OwlOptions, SlidesOutputData} from "ngx-owl-carousel-o";

import {CategoryService} from "../../../service/category.service";
import {BlogsService} from "../../../service/blogs.service";
import {Blog} from "../../../model/blog/blog";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})
export class SlideShowComponent implements OnInit {
  blogs: Blog[]
  customOptions: OwlOptions = {
    autoplayHoverPause: true,
    margin: 100,
    autoHeight:true,
    autoWidth:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    nav:true,
    navText: ['', '']
    // responsive: {
    //   0: {
    //     items: 1
    //   },
    //   300: {
    //     items: 2
    //   },
    //   600:{
    //     items:3
    //   },
    //   900:{
    //     items:4
    //   },
    //   1200:{
    //     items:5
    //   },
    //   1500:{
    //     items:6
    //   },
    //
    // },

  }
  activeSlides: SlidesOutputData | undefined;
  pipe = new DatePipe('en-US');
  constructor(private categoryService: CategoryService,private  blogService:BlogsService) {
    this.blogs = []
    this.blogService.getNewBlogPerCategory().subscribe(result => {
      this.blogs = result
      console.log(this.blogs)
    })

  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
  }
  ngOnInit(): void {
  }

}
