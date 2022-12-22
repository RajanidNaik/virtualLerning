import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HeadDialogComponent } from '../head-dialog/head-dialog.component';
import { FormGroup, FormControl } from '@angular/forms';
import { QuestionService } from '../question.service';

import { OnSaveComponent } from '../on-save/on-save.component';
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
    end: new FormControl(''),
    duration: new FormControl(''),
    certificateNumber: new FormControl('')
  });
  certificateDetails: any;

  constructor(private dialog: MatDialog, public service: QuestionService) {}

  ngOnInit(): void {
    this.getCertificateStudentList();
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '100%';
    dialogConfig.width = '100%';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.maxWidth = '100vw';
    (dialogConfig.panelClass = 'full-screen-modal'),
      (dialogConfig.position = {
        right: '0%',
        top: '0%',
      });
    this.dialog.open(HeadDialogComponent, dialogConfig);
  }
  openDialogSave() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      right: '0%',
      bottom: '15%',
    };
    this.dialog.open(OnSaveComponent, dialogConfig);
  }
  show() {
    this.openDialogSave();
    console.log(this.certForm.value);
  }
  getCertificateStudentList() {
    this.service.getCertificateStudent().subscribe({
      next: (res) => {
        console.log(res);
        this.certificateDetails = res;
        console.log(this.certificateDetails);
      },
      error: (error) => {
        alert(error.error.message);
      },
      complete: () => {
        this.setValue();
        sessionStorage.setItem(
          'certificateDetails',
          JSON.stringify(this.certificateDetails)
        );
        
      },
    });
  }
  setValue(){
    if(sessionStorage.getItem('certificateDetails')){
      console.log(this.certificateDetails);
      this.certForm.patchValue({
        title:this.certificateDetails[0].courseName,
        name:this.certificateDetails[0].fullName,
        course:this.certificateDetails[0].courseName,
        join:this.certificateDetails[0].joinDate,
        end:this.certificateDetails[0].completedDate,
        certificateNumber:this.certificateDetails[0].certificateNo,
        duration:this.certificateDetails[0].courseDuration
      })
     console.log( this.certForm.value)
    }
    
  }
}
