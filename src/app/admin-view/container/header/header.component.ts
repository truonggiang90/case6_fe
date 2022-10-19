import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../authority/service/auth.service";
import {Router} from "@angular/router";
import {UsersService} from "../../../service/users.service";
import {UserInfo} from "../../../model/user/userInfo";
import {UserInfoDTO} from "../../../model/user/userInfoDTO";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  value = 'Clear me';
  userInfoCurrent?: UserInfoDTO;

  constructor(private authService: AuthService, private router: Router, private userService: UsersService) {

  }

  ngOnInit(): void {
    this.userService.findCurrentUser().subscribe(userInfo => {
      this.userInfoCurrent = userInfo
      // @ts-ignore
      document.getElementById("avatar").setAttribute("src",this.userInfoCurrent?.avatar)
    })
  }

  logout() {
    console.log(this.authService.logout())
    this.router.navigateByUrl('/login');
  }
}
