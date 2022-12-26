import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { HeadDialogComponent } from '../head-dialog/head-dialog.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';

import { OnSaveComponent } from '../on-save/on-save.component';
import { FillCertificateComponent } from '../fill-certificate/fill-certificate.component';
@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  certForm = new FormGroup({
    title: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    course: new FormControl('',Validators.required),
    join: new FormControl('',Validators.required),
    end: new FormControl('',Validators.required),
    duration: new FormControl('',Validators.required),
    certificateNumber: new FormControl('',Validators.required),
    courseId:new FormControl('',Validators.required)
  });
  certificateDetails: any;

  constructor(private dialog: MatDialog, public service: QuestionService) {}

  ngOnInit(): void {
    this.openDialogCertificate();
    
   
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
    this.dialog.open(OnSaveComponent, dialogConfig);
  }
  show() {
    this.openDialogSave();
    console.log(this.certForm.value);
  }
  
  setValue(){
    if(sessionStorage.getItem('student')){
      this.certificateDetails = JSON.parse(sessionStorage.getItem('student') || '[]')
   
    
      this.certForm.patchValue({
        title:'Certification of completion',
        name:this.certificateDetails.fullName,
        course:this.certificateDetails.courseName,
        join:this.certificateDetails.joinDate,
        end:this.certificateDetails.completedDate,
        certificateNumber:this.certificateDetails.certificateNo,
        duration:this.certificateDetails.courseDuration,
        courseId:this.certificateDetails.courseId
      })
     console.log( this.certForm.value);
     sessionStorage.setItem(
      'previewDetails',
      JSON.stringify(this.certForm.value)
    );
    
  }
    
  }
  openDialogCertificate() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(FillCertificateComponent, dialogConfig);
   
    
  }
}
