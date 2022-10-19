import {forwardRef, NgModule} from "@angular/core";
import {AdminViewRoutingModule} from "../admin-view/admin-view-routing.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatChipsModule} from "@angular/material/chips";
import {MatDividerModule} from "@angular/material/divider";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {ErrorStateMatcher, MatOptionModule, ShowOnDirtyErrorStateMatcher} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import { LayoutComponent } from './layout/layout.component';
import {PasswordMatchValidatorRevealedDirective} from "../model/Validate/passwordMatchValidator-revealed.directive";
import { VerifyComponent } from './verify/verify.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
    imports: [
        AdminViewRoutingModule,
        MatMenuModule,
        MatChipsModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatTabsModule,
        MatDialogModule,
        MatOptionModule,
        MatSelectModule,
        MatCheckboxModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        CommonModule,
        MatListModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatProgressSpinnerModule
    ],

  declarations: [
    PasswordMatchValidatorRevealedDirective,
    LayoutComponent,
    VerifyComponent
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }
  ],
  exports:[PasswordMatchValidatorRevealedDirective]
})
export class AuthorityModule{}
