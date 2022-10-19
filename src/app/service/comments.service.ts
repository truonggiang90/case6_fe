import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../authority/service/auth.service";
import {Observable} from "rxjs";
import {LikeDTO} from "../model/like/likeDTO";
import {CommentDTO} from "../model/comments/commentDTO";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }
  ngOnInit():void{
  }

  getAllCommentByBlogId(id:number):Observable<CommentDTO[]>{
    return this.httpClient.get<CommentDTO[]>("http://localhost:8080/api/comment/"+id)
  }

  createComment(commentDTO:CommentDTO):Observable<CommentDTO>{
    return this.httpClient.post<CommentDTO>("http://localhost:8080/api/comment",commentDTO);
  }
}
