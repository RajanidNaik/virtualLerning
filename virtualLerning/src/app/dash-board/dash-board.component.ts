import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogDashboardComponent } from '../dialog-dashboard/dialog-dashboard.component';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
first:boolean=true;
second:boolean=false;
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
  // dialogConfig.height='100%';
  // dialogConfig.width='100%';
  
  this.dialog.open(DialogDashboardComponent,dialogConfig
    
  )   
}
}
