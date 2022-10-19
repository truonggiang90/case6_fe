import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import {BlogDTO} from "../../model/blog/blogDTO";
import {BlogsService} from "../../service/blogs.service";
import {CategoryDTO} from "../../model/category/categoryDTO";
import {CategoryService} from "../../service/category.service";
import {TagDTO} from "../../model/tag/tagDTO";
import {TagService} from "../../service/tag.service";

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  pipe = new DatePipe('en-US');
  blogPublic: BlogDTO[] = []
  blogInterface: BlogDTO[] = []
  selected: string = "";
  numberBlog = 8;
  categories: CategoryDTO[] = []
  tagList: TagDTO[] = []

  constructor(private blogSv: BlogsService, private categorySV: CategoryService,
              private tagSV: TagService) {
  }

  ngOnInit(): void {
    this.categorySV.findAll().subscribe(result => {
      this.categories = result
    })
    this.blogSv.getPublicBlog().subscribe(result => {
      this.numberBlog = 8;
      this.blogPublic = []
      this.blogInterface = result.reverse()
      this.displayBlog()
    })
    this.tagSV.getListTag().subscribe(result => {
      this.tagList = result;
    })
  }

  displayAllBlog(){
    this.ngOnInit()
  }

  displayBlog() {
    if (this.blogInterface.length >= this.numberBlog) {
      for (let i = 0; i < this.numberBlog; i++) {
        this.blogPublic.push(this.blogInterface[i]);
      }
    } else {
      for (let i = 0; i < this.blogInterface.length; i++) {
        this.blogPublic.push(this.blogInterface[i]);
      }
    }
  }

  displayBlogByTag(idTag:any){
    this.blogSv.getPublicBlogByTag(idTag).subscribe(result=>{
      this.numberBlog = 8;
      this.blogInterface = result;
      this.blogPublic = []
      this.displayBlog()
    })
  }
  loadMoreBlog() {
    this.numberBlog += 8;
    this.blogPublic = [];
    this.displayBlog();
  }

  applySelect() {
    if (!isNaN(Number(this.selected))) {
      this.blogSv.getPublicBlogByCategory(Number(this.selected)).subscribe(value => {
        this.numberBlog = 8;
        this.blogInterface = value;
        this.blogPublic = []
        this.displayBlog()
      })
    } else if (this.selected === "All") {
      this.blogSv.getPublicBlog().subscribe(result => {
        this.numberBlog = 8;
        this.blogInterface = result.reverse()
        this.blogPublic = []
        this.displayBlog();
      })

    }
  }

}
