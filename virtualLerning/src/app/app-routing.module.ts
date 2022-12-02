import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './add-course/add-course.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SecondHeadComponent } from './second-head/second-head.component';
import { SettingsComponent } from './settings/settings.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  {path:'head',component:HeaderComponent},
  {path:'secondHead',component:SecondHeadComponent},
  {path:'sideNav',component:SideNavComponent},
  {path:'dashboard',component:DashBoardComponent},
  {path:'addcourse',component:AddCourseComponent},
  {path:'studentlist',component:StudentListComponent},
  {path:'settings',component:SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
