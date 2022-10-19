import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authority/service/auth.service";
import {UsersService} from "../../service/users.service";
import {UserInfoDTO} from "../../model/user/userInfoDTO";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {CategoryDTO} from "../../model/category/categoryDTO";
import {CategoryService} from "../../service/category.service";


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  hide = false;
  userInfoCurrent?: UserInfoDTO;
  categories :CategoryDTO[]=[];
  constructor(private router: Router,private  categoryService :CategoryService,
              private authService: AuthService, private userService: UsersService) {

  }

  ngOnInit(): void {
    if (this.authService.currentUserValue == null) {
      this.hide = false;
    } else {
      this.hide = true
      this.userService.findCurrentUser().subscribe(userInfo => {
        this.userInfoCurrent = userInfo
        // @ts-ignore
        document.getElementById("avatar").setAttribute("src", this.userInfoCurrent?.avatar)
      })
    }
    this.categoryService.findAll().subscribe(result=>{
      this.categories=result
    })
    document.body.style.background = "#f8f9fb"
  }


  logout() {
    console.log(this.authService.logout())
    // this.hide=false
    window.location.reload();
    // window.location.href="http://localhost:4200/login"
    console.log(this.authService.isLoggedIn)
  }
  goToProfile(selected:number){
    if(selected==0){
      this.router.navigateByUrl("/home/userprofile")}
    else if(selected==1){
      this.router.navigate(["/home/userprofile2",selected])}
    else if(selected==2){
      this.router.navigate(["/home/userprofile3",selected])}
    else if(selected==3){
      this.router.navigate(["/home/userprofile4",selected])}
  }
}


