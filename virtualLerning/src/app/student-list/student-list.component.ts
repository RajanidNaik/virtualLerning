import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
isSubscribed:boolean=true;
  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('curr', JSON.stringify('Student List'));
  }

}
