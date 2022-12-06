import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
firstBlock:boolean=true;
secondBlock:boolean=false;
thirdBlock:boolean=false;
save:boolean=false;
  constructor() { }

  ngOnInit(): void {
  }
  onedit(){
    this.firstBlock=false;
    this.secondBlock =true;
    this.thirdBlock = false;
  }
  onback(){
    this.firstBlock=true;
    this.secondBlock = false;
    this.thirdBlock = false;
  }
  onchange(){
    this.firstBlock=false;
    this.secondBlock = false;
    this.thirdBlock = true;
  }
  onSave(){
    this.save =true;
  }
  onClose(){
    this.save =false;
  }
  onclose(){
    sessionStorage.removeItem('active');
  }

}
