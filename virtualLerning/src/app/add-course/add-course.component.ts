import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  plus = false;
  video=true;
  qAndA=false;
  certificate = false;
  constructor() { }

  ngOnInit(): void {
  }
  show(){
    this.plus = !this.plus;
  }
  openCer(){
    this.video = false;
    this.qAndA = false;
    this.certificate = true;
  }
  openQAndA(){
    this.video = false;
    this.qAndA = true;;
    this.certificate = false;
  }

  openVideo(){
    this.video = true;
    this.qAndA = false;
    this.certificate = false;
  }

}
