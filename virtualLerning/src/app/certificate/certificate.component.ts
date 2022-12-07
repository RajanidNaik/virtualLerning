import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { HeadDialogComponent } from '../head-dialog/head-dialog.component';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
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
      top:'0%'
    }
    this.dialog.open(HeadDialogComponent,dialogConfig)   
    
  }
}
