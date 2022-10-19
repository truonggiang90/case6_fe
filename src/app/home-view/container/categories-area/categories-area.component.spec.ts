import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAreaComponent } from './categories-area.component';

describe('CategoriesAreaComponent', () => {
  let component: CategoriesAreaComponent;
  let fixture: ComponentFixture<CategoriesAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
