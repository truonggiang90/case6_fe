import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {AdminViewModule} from "./admin-view/admin-view.module";
import {LoginComponent} from './authority/login/login.component';
import {RegisterComponent} from './authority/register/register.component';
import {AdminViewRoutingModule} from "./admin-view/admin-view-routing.module";
import {AuthorityModule} from "./authority/authority.module";
import {AuthorityRoutingModule} from "./authority/authority-routing.module";
import {httpInterceptorProviders} from "./authority/service/jwt-interceptor";
import {HomeViewModule} from "./home-view/home-view.module";
import {HomeViewRoutingModule} from "./home-view/home-view-routing.module";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatMenuModule,
        LayoutModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonToggleModule,
        FormsModule,
        MatRadioModule,
        MatInputModule,
        MatChipsModule,
        DragDropModule,
        MatSelectModule,
        HttpClientModule,
        MatCheckboxModule,
        MatDialogModule,
        AdminViewModule,
        AdminViewRoutingModule,
        AuthorityModule,
        AuthorityRoutingModule,
        ReactiveFormsModule,
        HomeViewModule,
        HomeViewRoutingModule,
        FontAwesomeModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        provideDatabase(() => getDatabase()),
        provideFirestore(() => getFirestore()),
        provideFunctions(() => getFunctions()),
        provideMessaging(() => getMessaging()),
        providePerformance(() => getPerformance()),
        provideRemoteConfig(() => getRemoteConfig()),
        provideStorage(() => getStorage()),
        BrowserModule, SocketIoModule.forRoot(config), MatProgressSpinnerModule
    ],
  providers: [httpInterceptorProviders, ScreenTrackingService,UserTrackingService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
