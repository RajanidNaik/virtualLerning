import { Component, OnInit } from '@angular/core';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { HeadDialogComponent } from '../head-dialog/head-dialog.component';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  certForm = new FormGroup({
    title: new FormControl(''),
    name: new FormControl(''),
    course: new FormControl(''),
    join: new FormControl(''),
    end: new FormControl('')
  });

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '0%';
    dialogConfig.width = '0%';
    dialogConfig.position = {
      right: '0%',
      top: '0%',
    };
    this.dialog.open(HeadDialogComponent, dialogConfig);
  }
show(){
  console.log(this.certForm.value);
  
}

}
