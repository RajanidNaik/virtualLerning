import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { DashBoardComponent } from './dash-board/dash-board.component';

import { DialogDashboardComponent } from './dialog-dashboard/dialog-dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { SecondHeadComponent } from './second-head/second-head.component';
import { OtpComponent } from './otp/otp.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SettingsComponent } from './settings/settings.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HeadDialogComponent } from './head-dialog/head-dialog.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {path:'dashboard',component:DashBoardComponent},
  {path:'addcourse',component:AddCourseComponent},
   {path:'otp',component:OtpComponent},
   {path:'password',component:PasswordChangeComponent},
  {path:'studentlist',component:StudentListComponent},
  {path:'settings',component:SettingsComponent},
  {path:'dialogDashboard',component:DialogDashboardComponent},
  {path:'profileDialog',component:ProfileDialogComponent},
  {path:'sideNav',component:SideNavComponent},
  {path:'head',component:HeadDialogComponent},
  {path:'header',component:HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
