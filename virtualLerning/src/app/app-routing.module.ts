import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { SettingsComponent } from './settings/settings.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {path:'dashboard',component:DashBoardComponent},
  {path:'addcourse',component:AddCourseComponent},
   {path:'otp',component:OtpComponent},
   {path:'password',component:PasswordChangeComponent},
  {path:'studentlist',component:StudentListComponent},
  {path:'settings',component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
