import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  Form, FormBuilder,
  FormControl, FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import {MyErrorStateMatcher} from "../../model/Validate/ErrorStateMatcher";
import {AuthService} from "../service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  minLengthUserName = 3
  minLength = 4
  username = new FormControl('', [Validators.required, Validators.minLength(this.minLengthUserName)])
  password = new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
  matcherUsername = new MyErrorStateMatcher();
  matcherPassword = new MyErrorStateMatcher();
  hide = true;
  signInGroup = this.formBuilder.group({
      username: this.username,
      password: this.password
    }
  );

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
              private router: Router, private route: ActivatedRoute) {


  }

  ngAfterViewInit() {
    let message = this.route.snapshot.paramMap.get("message")
    let alertType = this.route.snapshot.paramMap.get("alertType")
    if (alertType === "true" && message !== null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        // @ts-ignore
        text: message,

      })
    }
  }

  ngOnInit(): void {
    // @ts-ignore
    let role = this.authService.currentUserValue?.roles[0].authority
    if(this.authService.currentUserValue!=undefined){
      if (role == "ROLE_ADMIN") {
        this.router.navigateByUrl("/admin/dashboard")
      }else {
        this.router.navigateByUrl("")
      }
    }
  }

  login() {
    const val = this.signInGroup.value;
    if (val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe(value => {
          console.log(value);
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            timer: 1000
          }).finally(() => {
            // @ts-ignore
            if (value.roles[0].authority === "ROLE_ADMIN") {
              this.router.navigateByUrl('/admin/dashboard');
              // @ts-ignore
            } else if (value.roles[0].authority === "ROLE_USER") {
              this.router.navigateByUrl('/home/homepage')
            }
          })
        }, error => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: 'Login Fail',
            text: error.error.message,
            timer: 10000
          }).finally(() => {
            window.location.reload()
          })
        })

    }
  }
}
