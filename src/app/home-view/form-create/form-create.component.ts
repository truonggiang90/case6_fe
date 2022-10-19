import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogsService} from "../../service/blogs.service";
import {BlogDTO} from "../../model/blog/blogDTO";
import {Category} from "../../model/category/category";
import {CategoryService} from "../../service/category.service";
import {finalize, Observable, startWith} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {MyErrorStateMatcher} from "../../model/Validate/ErrorStateMatcher";
import {Blog} from "../../model/blog/blog";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {TagDTO} from "../../model/tag/tagDTO";
import {AuthService} from "../../authority/service/auth.service";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {TagService} from "../../service/tag.service";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-form-create',
  templateUrl: './form-create.component.html',
  styleUrls: ['./form-create.component.css']
})
export class FormCreateComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement> | undefined;

  minDescription = 50;
  maxDescription = 500;

  minTittle = 20;
  maxTittle = 200;

  blogDTOs?: Blog [];
  editorStyle = {
    height: '600px'
  }
  selectedImages: any[] = [];
  213: 'uploadFireBase';

  downloadURL: Observable<string> | undefined;
  fb: any;
  listURL: any[] = [];


  categories: Category[] = [];
  tags: TagDTO[] = []
  title = new FormControl('', [Validators.required, Validators.minLength(this.minTittle), Validators.maxLength(this.maxTittle)]);
  content = new FormControl('', [Validators.required, Validators.maxLength(100000000000000000)]);
  description = new FormControl('', [Validators.required, Validators.minLength(this.minDescription), Validators.maxLength(this.maxDescription)]);
  categoryId = new FormControl('', Validators.required);
  tag = new FormControl(' ');
  pictureLink?: string | null = "";

  titleMatcher = new MyErrorStateMatcher();
  contentMatcher = new MyErrorStateMatcher();
  descriptionMatcher = new MyErrorStateMatcher();
  formCreateBlog = this.formGroup.group({
    id: 0,
    categoryId: this.categoryId,
    title: this.title,
    describes: this.description,
    content: this.content,
    picture: this.pictureLink,
    tags: this.tag
  })

  blogId = -1


  isUpdate = false;
  filteredTag: Observable<string[]> | undefined;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagString: string[] = [];
  tagSuggest: string[] = []

  constructor(private blogsService: BlogsService, private authService: AuthService,
              private formGroup: FormBuilder, private tagService: TagService,
              private storage: AngularFireStorage,
              private categoryService: CategoryService,
              private router: Router, private route: ActivatedRoute) {
    this.filteredTag = this.tag.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.tagSuggest.slice())),
    );
  };

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagSuggest.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  showTag(tags: any) {
    for (const element of tags) {
      if (element.name != null) {
        this.tagSuggest.push(element.name);
      }
    }
  }
  ngOnInit(): void {
    this.categories = [];
    this.categoryService.findAll().subscribe(result => {
      this.categories = result;
    });
    let message = this.route.snapshot.paramMap.get("blog")
    if (message) {
      this.blogId = Number(message)
    }
    if (this.blogId !== -1) {
      this.blogsService.getBlog(this.blogId).subscribe(result => {
        // @ts-ignore
        this.formCreateBlog.patchValue(result)
        this.pictureLink = result.picture;
        this.categoryId.setValue(String(result.categoryId))
        this.isUpdate = true
        // @ts-ignore
        for (const element of result.tag) {
          if (element.name != null) {
            this.tagString.push(element.name);
          }
        }
      })
    }
  }

  onChangSelectCategory(event: any) {
    let categoryId = Number(this.formCreateBlog.value.categoryId);
    if (!isNaN(categoryId)) {
      this.tagService.getListTagByCategoryId(categoryId).subscribe(result => {
        this.tags = result;
        this.showTag(result);
      })
    }

  }

  updateBlog() {
    let tagUpdate: TagDTO[] = []
    for (const element of this.tagString) {
      tagUpdate.push({
        name: element
      })
    }
    let newString = this.formCreateBlog.value.content?.replace(/'/gi, "`")
    let blog: BlogDTO = {
      id: this.formCreateBlog.value.id,
      categoryId: Number(this.formCreateBlog.value.categoryId),
      title: this.formCreateBlog.value.title,
      describes: this.formCreateBlog.value.describes,
      content: newString,
      picture: this.pictureLink,
      tag: tagUpdate
    }
    this.blogsService.updateBlog(blog).subscribe(result => {
      Swal.fire({
        icon: 'success',
        title: 'Update Blog Success',
        timer: 2500
      }).finally(() => {
        this.router.navigateByUrl("/home/userprofile")
      })
    }, error => {
      Swal.fire({
        icon: 'warning',
        title: 'Update Blog fail',
        timer: 2500
      })
    })
  }

  createBlog() {
    let tagCreate: TagDTO[] = []
    for (const element of this.tagString) {
      tagCreate.push({
        name: element
      })
    }
    let newString = this.formCreateBlog.value.content?.replace(/'/gi, "`")
    // @ts-ignore
    let blog: BlogDTO = {
      categoryId: Number(this.formCreateBlog.value.categoryId),
      title: this.formCreateBlog.value.title,
      describes: this.formCreateBlog.value.describes,
      content: newString,
      picture: this.pictureLink,
      tag: tagCreate
    }
    this.blogsService.createBlog(blog).subscribe(value => {
      console.log(value);
      if (value != null) {
        Swal.fire({
          icon: 'success',
          title: 'Create Blog Success',
          timer: 2500
        }).finally(() => {
          this.router.navigateByUrl("/home/userprofile")
        })
      } else {
        console.log("out")
      }
    }, error => {
      Swal.fire({
        icon: 'warning',
        title: 'create Blog fail',
        timer: 2500
      })
    })
  }

  createImage() {
    if (this.selectedImages.length !== 0) {
      let URLs = []
      for (let i = 0; i < this.selectedImages.length; i++) {
        let selectedImage = this.selectedImages[i];
        var n = Date.now();
        const filePath = `Images/${n}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.pictureLink = url
              this.listURL.push(url)
            });
          })
        ).subscribe()
      }
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages[0] = event.target.files[0];
      console.log(event.target.files)
    } else {
      this.selectedImages = []
    }
    this.createImage();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tagString.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tag.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tagString.indexOf(tag);

    if (index >= 0) {
      this.tagString.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tagString.push(event.option.viewValue);
    // @ts-ignore
    this.tagInput.nativeElement.value = '';
    this.tag.setValue(null);
  }


}
