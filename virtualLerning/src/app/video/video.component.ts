import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  plus = false;
  video = true;
  qAndA = false;
  certificate = false;
  constructor() {}

  ngOnInit(): void {}
  show() {
    this.plus = !this.plus;
  }
}
