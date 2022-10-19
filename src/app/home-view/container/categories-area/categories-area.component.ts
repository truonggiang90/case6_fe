import {Component, OnInit} from '@angular/core';
import {Category} from "../../../model/category/category";
import {CategoryService} from "../../../service/category.service";
import {OwlOptions, SlidesOutputData} from "ngx-owl-carousel-o";
import {getHoverColor} from "chart.js/types/helpers";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-categories-area',
  templateUrl: './categories-area.component.html',
  styleUrls: ['./categories-area.component.css'],
})
export class CategoriesAreaComponent implements OnInit {
  categories: Category[]
  customOptions: OwlOptions = {
    center: true,
    autoplay: true,
    autoplayTimeout: 10000,
    autoplayHoverPause: true,
    margin: 30,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  activeSlides: SlidesOutputData | undefined;

  constructor(private categoryService: CategoryService) {
    this.categories = []
    this.categoryService.findAll().subscribe(result => {
      this.categories = result
    })
  }

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

  ngOnInit(): void {

  }

}
