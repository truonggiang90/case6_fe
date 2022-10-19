import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoryService} from "../../service/category.service";
import {CategoryDTO} from "../../model/category/categoryDTO";
import {BlogDTO} from "../../model/blog/blogDTO";
import {BlogsService} from "../../service/blogs.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  category: CategoryDTO = {};
  categoryId = 0;
  blogOfCategory: BlogDTO[] = []


  constructor(private route: ActivatedRoute, private categorySV: CategoryService,
              private blogSv: BlogsService) {
  }

  ngOnInit(): void {
    let categoryId = this.route.snapshot.paramMap.get("category")
    let tagId = this.route.snapshot.paramMap.get("tag")
    console.log(tagId)
    if (tagId != null) {
      if (categoryId != null) {
        this.categoryId = Number(categoryId)
        console.log(categoryId)
        this.categorySV.findCategoryById(Number(categoryId)).subscribe(result => {
          if (result != null)
            this.category = result;
        })
        this.blogSv.getPublicBlogByTag(Number(tagId)).subscribe(result => {
          this.blogOfCategory = result;
        })
      }
    } else {
      if (categoryId != null) {
        this.categoryId = Number(categoryId)
        console.log(categoryId)
        this.categorySV.findCategoryById(Number(categoryId)).subscribe(result => {
          if (result != null)
            this.category = result;
        })
        this.blogSv.getPublicBlogByCategory(Number(categoryId)).subscribe(result => {
          this.blogOfCategory = result;
        })
      }
    }
  }

  displayPublicBlog() {
    let categoryId = this.route.snapshot.paramMap.get("category")
    if (categoryId != null) {
      this.categoryId = Number(categoryId)
      console.log(categoryId)
      this.categorySV.findCategoryById(Number(categoryId)).subscribe(result => {
        if (result != null)
          this.category = result;
      })
      this.blogSv.getPublicBlogByCategory(Number(categoryId)).subscribe(result => {
        this.blogOfCategory = result;
      })
    }
  }

  displayBlogByTag(idTag: any) {
    console.log(idTag)
    this.blogSv.getPublicBlogByTag(idTag).subscribe(result => {
      console.log(result)
      this.blogOfCategory = result;
    })
  }
}
