import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Blog} from "../model/blog/blog";
import {BlogStatus} from "../model/blog/blog-status";
import {BlogsOfUser} from "../model/blog/blogsOfUser";
import {BlogMostLike} from "../model/blog/blog-most-like";
import {BlogDTO} from "../model/blog/blogDTO";
import {KeyValue} from "@angular/common";
import {BlogRecentlyPerCategory} from "../model/blog/blog-recently-per-category";
import {ImageURL} from "../model/ImageURL";
import {AuthService} from "../authority/service/auth.service";
import {Message} from "../model/message";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(private httpClient: HttpClient, private authService: AuthService) {
  }

  getBlog(idBlog: number): Observable<BlogDTO> {
    return this.httpClient.get<BlogDTO>("http://localhost:8080/api/blog/" + idBlog)
  }

  getTopBlogMostLike(): Observable<BlogDTO[]> {
    return this.httpClient.get<BlogDTO[]>("http://localhost:8080/api/blog/public/most-like")
  }

  findAll(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>("http://localhost:8080/api/blog")
  }

  getAllBlogOfUser(id: number): Observable<BlogDTO[]> {
    return this.httpClient.get<BlogDTO[]>("http://localhost:8080/api/blog/user/" + id)
  }

  getAllBlogRecently(): Observable<BlogDTO[]> {
    return this.httpClient.get<BlogDTO[]>("http://localhost:8080/api/blog/recently")
  }

  getThreeNewBlogsPerCategory(): Observable<BlogRecentlyPerCategory[]> {
    return this.httpClient.get<BlogRecentlyPerCategory[]>
    ("http://localhost:8080/api/blog/public/three-new-blog-per-category")
  }

  banBlog(id: number): Observable<BlogStatus> {
    return this.httpClient.get<BlogStatus>("http://localhost:8080/api/blog/ban/" + id)
  }

  activeBlog(id: number): Observable<BlogStatus> {
    return this.httpClient.get<BlogStatus>("http://localhost:8080/api/blog/active/" + id)
  }

  getlistBlogsOfUser(): Observable<BlogsOfUser[]> {
    return this.httpClient.get<BlogsOfUser[]>("http://localhost:8080/api/blog/listBlogsOfUser")
  }

  getlistBlogsMostLike(): Observable<BlogMostLike[]> {
    return this.httpClient.get<BlogMostLike[]>("http://localhost:8080/api/blog/listBlogsMostLike")
  }

  getTopTenBlogMostLike(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>("http://localhost:8080/api/blog/public/top-ten-most-like")
  }

  getNewBlogPerCategory(): Observable<Blog[]> {
    return this.httpClient.get<Blog[]>("http://localhost:8080/api/blog/public/most-like-per-category")
  }

  createBlog(blog: BlogDTO): Observable<BlogDTO> {
    return this.httpClient.post<BlogDTO>("http://localhost:8080/api/blog/" + this.authService.currentUserValue?.id, blog)
  }

  getPublicBlog(): Observable<BlogDTO[]> {
    return this.httpClient.get<BlogDTO[]>("http://localhost:8080/api/blog/public/")
  }
  getPublicBlogByTag(idTag:number): Observable<BlogDTO[]> {
    return this.httpClient.get<BlogDTO[]>("http://localhost:8080/api/blog/tag/"+idTag)
  }
  getPublicBlogByCategory(idCategory: number): Observable<BlogDTO[]> {
    return this.httpClient.get<BlogDTO[]>("http://localhost:8080/api/blog/public/category/" + idCategory)
  }

  updateBlog(blogDTO: BlogDTO): Observable<BlogDTO> {
    return this.httpClient.put<BlogDTO>("http://localhost:8080/api/blog/" + this.authService.currentUserValue?.id, blogDTO)
  }

  privateBlog(id: number): Observable<BlogStatus> {
    return this.httpClient.get<BlogStatus>("http://localhost:8080/api/blog/privateBlog/" + id)
  }

  publicBlog(id: number): Observable<BlogStatus> {
    return this.httpClient.get<BlogStatus>("http://localhost:8080/api/blog/publicBlog/" + id)
  }

  admitBlog(id: number): Observable<BlogStatus> {
    return this.httpClient.get<BlogStatus>("http://localhost:8080/api/blog/admitBlog/" + id + "/" + this.authService.currentUserValue?.id)
  }

  deleteBlog(id:number):Observable<Message>{
    return this.httpClient.delete<Message>("http://localhost:8080/api/blog/"+id+"/"+this.authService.currentUserValue?.id)
  }

}
