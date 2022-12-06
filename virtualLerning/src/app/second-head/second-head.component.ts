import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';

@Component({
  selector: 'app-second-head',
  templateUrl: './second-head.component.html',
  styleUrls: ['./second-head.component.css']
})
export class SecondHeadComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }
  openDialogProfile(){
    sessionStorage.setItem('active',JSON.stringify('yes'));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height='100%';
    dialogConfig.width='25%';
    dialogConfig.position ={
      right:'0%',
    }
    
    this.dialog.open(ProfileDialogComponent,dialogConfig)   
  }

}
