import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SecondHeadComponent } from './second-head/second-head.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatIconModule} from '@angular/material/icon';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SettingsComponent } from './settings/settings.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SecondHeadComponent,
    SideNavComponent,
    DashBoardComponent,
    AddCourseComponent,
    StudentListComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
