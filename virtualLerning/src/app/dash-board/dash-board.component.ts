import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogDashboardComponent } from '../dialog-dashboard/dialog-dashboard.component';
import { HeadDialogComponent } from '../head-dialog/head-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
first:boolean=true;
second:boolean=false;
isSubscribed:boolean=true;
value=70;
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
onBack(){
  this.first=true;
  this.second=false;
}
onRecent(){
  this.second=true;
  this.first =false;
}
openDialog(){
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
    dialogConfig.height='100%';
    dialogConfig.width='100%';
  dialogConfig.maxHeight='100vh';
  dialogConfig.maxWidth = '100vw';
  dialogConfig.panelClass = 'full-screen-modal',
  dialogConfig.position ={
    right:'0%',
    top:'0%',
    
  }
  this.dialog.open(DialogDashboardComponent,dialogConfig)   
  
}


}
