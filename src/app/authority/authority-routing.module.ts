import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {RegisterComponent} from "./register/register.component";
import {LayoutComponent} from "./layout/layout.component";
import {PasswordMatchValidatorRevealedDirective} from "../model/Validate/passwordMatchValidator-revealed.directive";
import {VerifyComponent} from "./verify/verify.component";


const authorityRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify', component: VerifyComponent}
]

@NgModule({
  imports: [RouterModule.forChild(authorityRoutes)],
  declarations: [],
  exports: [RouterModule]
})
export class AuthorityRoutingModule {

}
