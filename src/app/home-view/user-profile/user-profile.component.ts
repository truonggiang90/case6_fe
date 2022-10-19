import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsersService} from "../../service/users.service";
import {AbstractControl, FormBuilder, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {UserInfoDTO} from "../../model/user/userInfoDTO";
import Swal from "sweetalert2";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {AuthService} from "../../authority/service/auth.service";
import {BlogsService} from "../../service/blogs.service";
import {Blog} from "../../model/blog/blog";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {BlogDTO} from "../../model/blog/blogDTO";

import {user} from "@angular/fire/auth";
import {MyErrorStateMatcher} from "../../model/Validate/ErrorStateMatcher";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  idUpdate = 0
  ava?: string | null
  uploadedImage: File | undefined;
  imageFile!: any;
  imageSrc: string = "";
  minNewPassword = 8;
  maxNewPassword = 25;


  name = new FormControl('')
  email = new FormControl('', [Validators.required, Validators.email])
  avatar?: string = ""
  about = new FormControl('')
  birthday = new FormControl('')
  birthday1: string | null | undefined = ""
  registerDate = new FormControl('')
  username: string | null | undefined = ""

  formUpdateUser = this.formGroup.group({
    id: this.idUpdate,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    about: this.about,
    birthDay: this.birthday,
    registerDate: this.registerDate,
    username: this.username
  })

  oldPassword = new FormControl('', [Validators.required, Validators.minLength(this.minNewPassword), Validators.maxLength(this.maxNewPassword),
    this.regexValidator(new RegExp("\\w+([a-z])\\w+"), {lowercase: "false"}),
    this.regexValidator(new RegExp("\\w+([A-Z])\\w+"), {uppercase: "false"}),
    this.regexValidator(new RegExp("\\w+([0-9])\\w+"), {digital: "false"}),
    this.regexValidator(new RegExp("\\w+([!@#&()–{}:;',?/*~$_^+=<>])\\w+"), {characters: "false"}),
  ])
  newPassword = new FormControl('',
    [Validators.required, Validators.minLength(this.minNewPassword), Validators.maxLength(this.maxNewPassword),
      this.regexValidator(new RegExp("\\w+([a-z])\\w+"), {lowercase: "false"}),
      this.regexValidator(new RegExp("\\w+([A-Z])\\w+"), {uppercase: "false"}),
      this.regexValidator(new RegExp("\\w+([0-9])\\w+"), {digital: "false"}),
      this.regexValidator(new RegExp("\\w+([!@#&()–{}:;',?/*~$_^+=<>])\\w+"), {characters: "false"}),
    ])
  confirmNewPassword = new FormControl('',
    [Validators.required, Validators.minLength(this.minNewPassword), Validators.maxLength(this.maxNewPassword)])

  matcherOldPassword = new MyErrorStateMatcher()
  matcherPassword = new MyErrorStateMatcher()
  matcherRePassword = new MyErrorStateMatcher()
  hideNewPassword = true;
  hideConfirmPassword = true;
  hideOldPassword = true;

  changePasswordGroup = this.formGroup.group({
    oldPassword: this.oldPassword,
    newPassword: this.newPassword,
    confirmNewPassword: this.confirmNewPassword,
  })
  pipe = new DatePipe('en-US');
  blogs: BlogDTO[] = []
  selected = 0;
  animation = "";


  constructor(private userService: UsersService,
              private formGroup: FormBuilder,
              private storage: AngularFireStorage,
              private authService: AuthService,
              private blogService: BlogsService,
              private route: ActivatedRoute,
              private router: Router
  ) {
    this.getUser()
  }


  ngOnInit(): void {
    let message = this.route.snapshot.paramMap.get("selected")
    if (message) {
      this.selected = Number(message)
    }
    this.getUser()
    this.displayBlogOfUser();
  }

  displayBlogOfUser() {
    // @ts-ignore
    this.blogService.getAllBlogOfUser(this.authService.currentUserValue?.id).subscribe(result => {
      this.blogs = result
    })
  }


  ngAfterContentInit() {
  }

  selectionChange(event: any) {
    console.log(event)
    // @ts-ignore
    document.getElementById("inputBirthday").value = this.birthday1
  }

  privateBlog(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change to Private'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.privateBlog(id).subscribe(result => {
          console.log(result)
          Swal.fire({
            icon: 'success',
            title: 'Change complete',
            timer: 1500
          }).finally(() => {
            this.displayBlogOfUser();
          })
        })
      }
    })
  }

  publicBlog(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change to Public'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.publicBlog(id).subscribe(result => {
          console.log(result)
          Swal.fire({
            icon: 'success',
            title: 'Change complete',
            timer: 1500
          }).finally(() => {
            this.displayBlogOfUser();
          })
        })
      }
    })

  }

  getUser() {
    this.userService.findCurrentUser().subscribe(value => {
      this.formUpdateUser.patchValue(value)
      if (value.avatar != null) {
        this.ava = value.avatar
        this.imageSrc = value.avatar
      }

      this.username = value.username
      this.birthday1 = value.birthday
      console.log(this.birthday1)
    })
  }

  changePasswordUpload() {
    let password = {
      oldPassword: this.changePasswordGroup.value.oldPassword,
      newPassword: this.changePasswordGroup.value.newPassword,
      confirmNewPassword: this.changePasswordGroup.value.confirmNewPassword,
    }
    if (this.changePasswordGroup.value.newPassword == this.changePasswordGroup.value.oldPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Change fail',
        timer: 1500
      })
    } else if (this.changePasswordGroup.value.newPassword == this.changePasswordGroup.value.confirmNewPassword) {
      this.userService.changePassword(password).subscribe(value => {
        Swal.fire({
          icon: 'success',
          title: 'Change Password complete',
          timer: 1500
        }).finally(() => {
          this.authService.logout();
          window.location.reload()
        })
      },error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          timer: 1500
        }).finally(()=>{
          this.authService.logout()
          window.location.reload()
        })
      })
    }
  }

  updateUsers() {
    let users = {
      id: this.formUpdateUser.value.id,
      username: this.formUpdateUser.value.username,
      name: this.formUpdateUser.value.name,
      email: this.formUpdateUser.value.email,
      avatar: this.formUpdateUser.value.avatar,
      about: this.formUpdateUser.value.about,
      birthday: this.formUpdateUser.value.birthDay,
      registerDate: this.formUpdateUser.value.registerDate,
    }
    this.userService.updateUser(users).subscribe(value => {
      this.formUpdateUser.patchValue(value)
      if (value.avatar) {
        this.ava = value.avatar
      }
      Swal.fire({
        icon: 'success',
        title: 'Update complete',
        timer: 1500
      })
    })
  }

  showPreview(event: any) {
    this.imageFile = event.target.files[0]
    this.submitImage(event.target.files[0]);
  }

  submitImage(file: any) {
    if (this.imageFile != null) {
      const fileName = this.imageFile.name;
      const fileRef = this.storage.ref(fileName);
      // @ts-ignore
      Swal.fire({
        title: 'Loading...',
        html: 'Please wait...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          this.storage.upload(fileName, this.imageFile).snapshotChanges().pipe(
            finalize(() => (fileRef.getDownloadURL().subscribe(url => {
              this.imageSrc = url;
              Swal.close();
            })))
          ).subscribe();
        }
      }).then();
    }
  }

  uploadImgUser() {
    this.userService.uploadImgUser(this.imageSrc, this.authService.currentUserValue!.id).subscribe(() =>
      Swal.fire({
        icon: 'success',
        title: 'Update complete',
        timer: 1500
      }).finally(()=>{
        this.router.navigateByUrl("/home/userprofile3/2")
        window.location.reload()
        // this.cdr.detectChanges();
      })
    );
  }

  deleteBlog(id: any) {
    Swal.fire({
      title: 'Are you sure to delete this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete Blog'
    }).then((result) => {
      if (result.isConfirmed) {
        this.blogService.deleteBlog(id).subscribe(value => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: value.message,
            timer: 1500
          }).finally(()=>{
            this.displayBlogOfUser()
          })
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Fail',
            text: error.error.message,
            timer: 1500
          }).finally(()=>{
            this.displayBlogOfUser()
          })
        })
      }
    })
  }


  goToUpdateBlog(id: number | null | undefined) {
    this.router.navigateByUrl("/home/updateBlog/" + id)
  }


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
