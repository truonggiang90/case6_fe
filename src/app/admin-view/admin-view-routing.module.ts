import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {UsersComponent} from "./users/users.component";
import {NavbarComponent} from "./container/navbar/navbar.component";
import {AuthorityGuard} from "../authority/login/authority.guard";
import {BlogsComponent} from "./blogs/blogs.component";
import {CategoryComponent} from "./category/category.component";



const adminRoutes: Routes = [
  {
    path: 'admin',
    component: NavbarComponent,
    // canActivate:[AuthorityGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthorityGuard],
        children: [
          {path: 'dashboard', component: DashboardComponent},
          {path: '', component: DashboardComponent},
          {path: 'users', component: UsersComponent},
          {path: 'blogs', component: BlogsComponent},
          {path: 'category', component: CategoryComponent},

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminViewRoutingModule {
}
