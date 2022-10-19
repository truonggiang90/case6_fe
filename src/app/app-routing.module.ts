import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path:"admin",
    loadChildren:()=>import("./admin-view/admin-view.module").then(m => m.AdminViewModule)
  },
  {
    path:'authority,' ,
    loadChildren:()=> import("./authority/authority.module").then(m=> m.AuthorityModule)
  },
  {
      path:'home',
    loadChildren:()=> import("./home-view/home-view.module").then(m=> m.HomeViewModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
