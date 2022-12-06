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

  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
