import { Component, OnInit } from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from "@angular/material/progress-spinner";
import {UsersService} from "../../service/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  success=false
  constructor(private  userService:UsersService,private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

  }


  ngAfterViewInit(){
    let token=this.route.snapshot.paramMap.get("token")
    if(token){
      this.userService.verify(token).subscribe(result=>{
        this.router.navigateByUrl("/login")
      })
    }
  }
}
