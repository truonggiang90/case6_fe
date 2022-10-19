import {Component, OnInit} from '@angular/core';
import {Blog} from "../../model/blog/blog";
import {BlogsService} from "../../service/blogs.service";
import {DatePipe} from "@angular/common";
import {BlogDTO} from "../../model/blog/blogDTO";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../authority/service/auth.service";
import {CommentsService} from "../../service/comments.service";
import {CommentDTO} from "../../model/comments/commentDTO";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css']
})
export class SingleBlogComponent implements OnInit {
  blogs: Blog[] = []
  blog: BlogDTO = {}
  comments: CommentDTO[] = []
  commentShow: CommentDTO[] = []
  numberComment = 3
  pipe = new DatePipe('en-US');
  blogId = 0
  hide = false;
  comment = new FormControl(" ")


  constructor(private blogService: BlogsService, private commentService: CommentsService,
              private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.blogService.getTopTenBlogMostLike().subscribe(result => {
      this.blogs = result
    })
    if (this.authService.currentUserValue != undefined) {
      this.hide = true;
    }
    let message = this.route.snapshot.paramMap.get("blog")
    if (message) {
      this.blogId = Number(message)
    }
    this.blogService.getBlog(Number(message)).subscribe(result => {
      this.blog = result
      const script1 = document.createElement('script');
      script1.innerHTML = 'document.getElementById("content").innerHTML=' + "'" + result.content + "'"
      document.body.appendChild(script1);
    })
    this.commentShow=[]
    this.commentService.getAllCommentByBlogId(Number(message)).subscribe(result => {
      this.comments = result.reverse()
      this.displayComment();
    })
    this.comment.setValue("")
  }

  ngAfterViewInit() {

  }

  loadMoreComment() {
    this.numberComment += 3;
    this.commentShow = [];
    this.displayComment()
  }

  displayComment() {
    if (this.comments.length >= this.numberComment) {
      for (let i = 0; i < this.numberComment; i++) {
        this.commentShow.push(this.comments[i]);
      }
    } else {
      for (let i = 0; i < this.comments.length; i++) {
        this.commentShow.push(this.comments[i]);
      }
    }
  }

  createComment() {
    let message = this.route.snapshot.paramMap.get("blog")
    let commentDTO: CommentDTO = {
      content: this.comment.value,
      idUserInfo: this.authService.currentUserValue?.id,
      idBlog: Number(message)
    }
    console.log(commentDTO)
    this.commentService.createComment(commentDTO).subscribe(result => {
      this.ngOnInit()
    }, error => {
      console.log(error.error.message)
    })
  }


}
