import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../authority/service/auth.service";
import {Observable} from "rxjs";
import {UserInfo} from "../model/user/userInfo";
import {LikeDTO} from "../model/like/likeDTO";
import {Message} from "../model/message";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  ngOnInit():void{
  }
  getList(idBlog:number):Observable<LikeDTO[]>{
    return this.httpClient.get<LikeDTO[]>("http://localhost:8080/api/like/"+idBlog)
  }

  likeBlog(likeDTO:LikeDTO):Observable<Message>{
    return this.httpClient.post<Message>("http://localhost:8080/api/like",likeDTO)
  }
  unLikeBlog(likeDTO:LikeDTO):Observable<Message>{
    return this.httpClient.post<Message>("http://localhost:8080/api/like/unlike",likeDTO)
  }
}
