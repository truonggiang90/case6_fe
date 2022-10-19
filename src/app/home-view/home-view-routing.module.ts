import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {HomepageComponent} from "./homepage/homepage.component";
import {LayoutComponent} from "./layout/layout.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {CategoriesComponent} from "./categories/categories.component";
import {BlogsComponent} from "../admin-view/blogs/blogs.component";
import {FormCreateComponent} from "./form-create/form-create.component";
import {LoginComponent} from "../authority/login/login.component";
import {AuthorityHomeGuard} from "./authority-home.guard";
import {SingleCategoryComponent} from "./single-category/single-category.component";
import {SingleBlogComponent} from "./single-blog/single-blog.component";
import {TrendingComponent} from "./trending/trending.component";
import {ErrorPageComponent} from "./error-page/error-page.component";



const homeRoutes: Routes = [
  {
    path: "home",
    component: LayoutComponent,
    children: [
      {
      path: '',
      children:[
        {path:'homepage',component:HomepageComponent},
        {path:'userprofile',component:UserProfileComponent,canActivate:[AuthorityHomeGuard]},
        {path:'userprofile1/:selected',component:UserProfileComponent,canActivate:[AuthorityHomeGuard]},
        {path:'userprofile2/:selected',component:UserProfileComponent,canActivate:[AuthorityHomeGuard]},
        {path:'userprofile3/:selected',component:UserProfileComponent,canActivate:[AuthorityHomeGuard]},
        {path:'userprofile4/:selected',component:UserProfileComponent,canActivate:[AuthorityHomeGuard]},
        {path:'createBlog',component:FormCreateComponent,canActivate:[AuthorityHomeGuard]},
        {path:'updateBlog/:blog',component:FormCreateComponent,canActivate:[AuthorityHomeGuard]},
        {path:'categories',component:CategoriesComponent},
        {path:'category',component:SingleCategoryComponent},
        {path:'category/Food/:category',component:SingleCategoryComponent},
        {path:'category/Game/:category',component:SingleCategoryComponent},
        {path:'category/Movie/:category',component:SingleCategoryComponent},
        {path:'category/Car/:category',component:SingleCategoryComponent},
        {path:'category/Music/:category',component:SingleCategoryComponent},
        {path:'category/Pet/:category',component:SingleCategoryComponent},
        {path:'category/Food/:category/:tag',component:SingleCategoryComponent},
        {path:'category/Game/:category/:tag',component:SingleCategoryComponent},
        {path:'category/Movie/:category/:tag',component:SingleCategoryComponent},
        {path:'category/Car/:category/:tag',component:SingleCategoryComponent},
        {path:'category/Music/:category/:tag',component:SingleCategoryComponent},
        {path:'category/Pet/:category/:tag',component:SingleCategoryComponent},
        {path:'blog/:blog',component:SingleBlogComponent},
        {path:'trending',component:TrendingComponent}
      ]
      }

    ]
  },
  {
    path:"",
    component:LayoutComponent,
    children:[
      {path: "",component:HomepageComponent}
    ]
  },
  {
    path:"",
    component:LayoutComponent,
    children:[
      {path:'error',component:ErrorPageComponent}
    ]
  },
  {
    path:"**",
    component:LayoutComponent,
    children:[
      {path:'**',component:ErrorPageComponent}
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeViewRoutingModule {
}
