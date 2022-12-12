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
import { HttpClientModule } from '@angular/common/http';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SignupComponent } from './signup/signup.component';
import { DialogCategoryComponent } from './dialog-category/dialog-category.component';


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
    SuperAdminComponent,
    SignupComponent,
    DialogCategoryComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
