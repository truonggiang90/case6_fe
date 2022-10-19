import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../model/category/category";
import {CategoryDTO} from "../model/category/categoryDTO";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {
  }
  findAll(): Observable<CategoryDTO[]> {
    return this.httpClient.get<CategoryDTO[]>("http://localhost:8080/api/category")
  }
  findCategoryById(idCategory :number):Observable<CategoryDTO>{
    return this.httpClient.get <CategoryDTO>("http://localhost:8080/api/category/"+idCategory)
  }
}
