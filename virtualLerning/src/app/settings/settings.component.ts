import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
success:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
onSave(){
  this.success =true;
}
onclose(){
  this.success =false;
}
}
