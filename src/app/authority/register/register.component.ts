import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MyErrorStateMatcher} from "../../model/Validate/ErrorStateMatcher";
import {AuthService} from "../service/auth.service";
import Swal from "sweetalert2";
import {finalize} from "rxjs";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  minUsername = 3
  minPassword = 8
  maxPassword = 25
  maxUsername = 25
  maxEmail = 50
  minEmail = 10
  username = new FormControl('',
    [Validators.required, Validators.minLength(this.minUsername), Validators.maxLength(this.maxUsername)])
  email = new FormControl('',
    [Validators.email, Validators.maxLength(this.maxEmail), Validators.required, Validators.minLength(this.minEmail)])
  password = new FormControl('',
    [Validators.required, Validators.minLength(this.minPassword), Validators.maxLength(this.maxPassword),
      this.regexValidator(new RegExp("\\w+([a-z])\\w+"), {lowercase: "false"}),
      this.regexValidator(new RegExp("\\w+([A-Z])\\w+"), {uppercase: "false"}),
      this.regexValidator(new RegExp("\\w+([0-9])\\w+"), {digital: "false"}),
      this.regexValidator(new RegExp("\\w+([!@#&()–{}:;',?/*~$_^+=<>])\\w+"), {characters: "false"}),
    ])
  confirmPassword = new FormControl('',
    [Validators.required, Validators.minLength(this.minPassword), Validators.maxLength(this.maxPassword)])
  matcherUsername = new MyErrorStateMatcher()
  matcherPassword = new MyErrorStateMatcher()
  matcherRePassword = new MyErrorStateMatcher()
  matcherEmail = new MyErrorStateMatcher()
  hidePassword = true;
  hideConfirmPassword = true;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  registerGroup = this.formBuilder.group({
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword

    }
  );

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {

  }


  ngOnInit(): void {
  }

  register() {
    const val = this.registerGroup.value;
    Swal.fire({
      title: 'Loading...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
        if (val.username && val.password && val.confirmPassword && val.email) {
          this.authService.register(val.username, val.password, val.confirmPassword, val.email).subscribe(result => {
              console.log(result)
              this.isSuccessful = true;
              this.isSignUpFailed = false;
              Swal.close();
            }, error => {
              this.errorMessage = error.error.message;
              this.isSignUpFailed = true;
              Swal.close();
            }
          )
        }
      }
    }).then();

  }

  //Group Pattern Validator

  private regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [p: string]: any } | null => {
      if (!control.value) {
        console.log(control.value)
        return null;
      }
      const valid = regex.test(control.value);
      // @ts-ignore
      return valid ? null : error;
    };
  }

}



