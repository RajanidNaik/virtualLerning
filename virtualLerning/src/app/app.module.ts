import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SecondHeadComponent } from './second-head/second-head.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SettingsComponent } from './settings/settings.component';
import { DialogDashboardComponent } from './dialog-dashboard/dialog-dashboard.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { HeadDialogComponent } from './head-dialog/head-dialog.component';
import { OtpComponent } from './otp/otp.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { VideoComponent } from './video/video.component';
import { CertificateComponent } from './certificate/certificate.component';
import { QAndAComponent } from './q-and-a/q-and-a.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxFileDropModule } from 'ngx-file-drop';  
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { DialogCategoryComponent } from './dialog-category/dialog-category.component';
import { SuperAdmindashboardComponent } from './super-admindashboard/super-admindashboard.component';
import { AuthserviceInterceptor } from './authservice.interceptor';
import { DeleteStudentComponent } from './delete-student/delete-student.component';

import { SubCatComponent } from './sub-cat/sub-cat.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthGuard } from './guard/auth.guard';
import { OnSaveComponent } from './on-save/on-save.component';
import { FillCertificateComponent } from './fill-certificate/fill-certificate.component';
import { LoggedInGuard } from './loggedIn/logged-in.guard';
import { PreventGuard } from './prevent/prevent.guard';
import { NFoundComponent } from './nfound/nfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SecondHeadComponent,
    SideNavComponent,
    DashBoardComponent,
    AddCourseComponent,
    StudentListComponent,
    SettingsComponent,
    LoginComponent,
    DialogDashboardComponent,
    ProfileDialogComponent,
    HeadDialogComponent,
    OtpComponent,
    PasswordChangeComponent,
    VideoComponent,
    CertificateComponent,
    QAndAComponent,
    SignupComponent,
    DialogCategoryComponent,
    SuperAdmindashboardComponent,
    DeleteStudentComponent,

    SubCatComponent,
    OnSaveComponent,
    FillCertificateComponent,
    NFoundComponent,
  ],

  imports: [
    HttpClientModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxFileDropModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthserviceInterceptor,
      multi: true,
    },
    ScreenTrackingService,
    UserTrackingService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
