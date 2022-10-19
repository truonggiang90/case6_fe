import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../service/category.service";
import {CategoryDTO} from "../../model/category/categoryDTO";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories :CategoryDTO[]=[]

  constructor(private categorySV : CategoryService) {
    this.categorySV.findAll().subscribe(result=>{
      this.categories=result;
      console.log(this.categories)
    })
  }

  ngOnInit(): void {
  }

}
