import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../authority/service/auth.service";
import {LikeService} from "../../../service/like.service";
import {CommentsService} from "../../../service/comments.service";
import {LikeDTO} from "../../../model/like/likeDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
  @Input() value: any = 0
  @Input() valueComment: any = 0
  @Input() liked: any = false
  @Input() icon: any = ""
  @Input() iconReplace: any = ""
  @Input() idBlog: any
  @Input() action: any = ""


  likedIcon: boolean = Boolean(this.liked)
  // @ts-ignore
  idBlogIcon: number
  listLikeDTO: LikeDTO[] = []
  tooltip = ""

  constructor(private authService: AuthService, private likeService: LikeService,
              private commentService: CommentsService, private router: Router) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.displayLike()
  }

  displayLike() {
    this.idBlogIcon = Number(this.idBlog)
    if (!isNaN(this.idBlogIcon)) {
      this.likeService.getList(this.idBlogIcon).subscribe(result => {
        this.listLikeDTO = result
        this.tooltip = ""
        for (let likeDTO of result) {
          this.tooltip += likeDTO.username + " , "
        }
        this.tooltip = this.tooltip.substring(0, this.tooltip.length - 2)
        for (let likeDTO of result) {
          if (this.authService.currentUserValue?.id === likeDTO.idUser) {
            this.liked = true;
          }
        }
        this.value = result.length
      })
    }
  }

  likeBlog() {
    if (this.authService.currentUserValue == null) {
      this.router.navigateByUrl("/login")
    } else {
      if (this.liked == false) {
        let likeDTO: LikeDTO = {
          idBlog: this.idBlogIcon,
          idUser: this.authService.currentUserValue?.id
        }
        this.likeService.likeBlog(likeDTO).subscribe(result => {
            this.liked = result.result
            this.displayLike()
          }
        )
      }
    }
  }

  unLikeBlog() {
    if (this.authService.currentUserValue == null) {
      this.router.navigateByUrl("/login")
    } else {
      if (this.liked == true) {
        let likeDTO: LikeDTO = {
          idBlog: this.idBlogIcon,
          idUser: this.authService.currentUserValue?.id
        }
        this.likeService.unLikeBlog(likeDTO).subscribe(result => {
            this.liked = result.result
            this.displayLike()
          }
        )
      }
    }

  }

}
