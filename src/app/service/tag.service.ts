import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../authority/service/auth.service";
import {Observable} from "rxjs";
import {LikeDTO} from "../model/like/likeDTO";
import {TagDTO} from "../model/tag/tagDTO";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getListTagByBlogId(idBLog: number): Observable<TagDTO[]> {
    return this.httpClient.get<TagDTO[]>("http://localhost:8080/api/tag/blog/" + idBLog)
  }

  getListTagByCategoryId(idCategory: number): Observable<TagDTO[]> {
    return this.httpClient.get<TagDTO[]>("http://localhost:8080/api/tag/category/" + idCategory)
  }

  getListTag(): Observable<TagDTO[]> {
    return this.httpClient.get<TagDTO[]>("http://localhost:8080/api/tag")
  }
}
