import {NgModule} from "@angular/core";
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import {RouterModule} from "@angular/router";
import { CategoriesComponent } from './categories/categories.component';
import { SlideShowComponent } from './container/slide-show/slide-show.component';
import {CarouselModule} from "ngx-owl-carousel-o";
import { CategoriesAreaComponent } from './container/categories-area/categories-area.component';
import {CommonModule} from "@angular/common";
import { BlogAreaComponent } from './container/blog-area/blog-area.component';
import {MatDividerModule} from "@angular/material/divider";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatIconModule} from "@angular/material/icon";
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormCreateComponent} from "./form-create/form-create.component";
import {QuillModule} from "ngx-quill";
import {MatTabsModule} from "@angular/material/tabs";
import {MatInputModule} from "@angular/material/input";
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {ChangePasswordMatchValidatorRevealedDirective} from "../model/Validate/changePasswordMatchValidator-revealed.directive";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import { IconComponent } from './container/icon/icon.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { BlogCategoryComponent } from './single-category/blog-category/blog-category.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { TrendingComponent } from './trending/trending.component';
import {MatSelectModule} from "@angular/material/select";
import { ErrorPageComponent } from './error-page/error-page.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";


@NgModule({
  imports: [
    RouterModule,
    CarouselModule,
    CommonModule,
    MatDividerModule,
    FontAwesomeModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  declarations: [
    LayoutComponent,
    HomepageComponent,
    CategoriesComponent,
    SlideShowComponent,
    CategoriesAreaComponent,
    BlogAreaComponent,
    UserProfileComponent,
    FormCreateComponent,
    ChangePasswordMatchValidatorRevealedDirective,
    IconComponent,
    SingleCategoryComponent,
    BlogCategoryComponent,
    SingleBlogComponent,
    TrendingComponent,
    ErrorPageComponent

  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  exports:[ChangePasswordMatchValidatorRevealedDirective]
})


export class HomeViewModule {
}
