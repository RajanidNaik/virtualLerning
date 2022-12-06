import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-q-and-a',
  templateUrl: './q-and-a.component.html',
  styleUrls: ['./q-and-a.component.css'],
})
export class QAndAComponent implements OnInit {
  plus= false;
  constructor() {}

  ngOnInit(): void {}
  show() {
    this.plus = !this.plus;
  }
}
