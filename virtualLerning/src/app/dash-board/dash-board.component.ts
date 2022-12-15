import { Component, HostListener, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DialogDashboardComponent } from '../dialog-dashboard/dialog-dashboard.component';
import { HeadDialogComponent } from '../head-dialog/head-dialog.component';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { QuestionService } from '../question.service';
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
data:any;
date=new Date();
limit=2;
student:any;
token:any;
ongoing:any;
complete:any;
  constructor(private dialog:MatDialog,public service:QuestionService) { }

  ngOnInit(): void {
    localStorage.setItem('curr',JSON.stringify("Dashboard"));
    this.token=localStorage.getItem('token');
    this.getCount();
    this.getStudent();
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
getCount(){
  this.service.getTotal().subscribe((data)=>{
    
    this.data = data;
    console.log(this.data.totalStudentsEnrolled);
  })
}
getStudent(){
  this.service.getStudentList(this.limit).subscribe((data:any)=>{
    console.log(data);
    this.student = data;
    if(this.data.courseCompletedStatus == true){
      this.complete=true;
      this.ongoing=false;
     }else{
      this.complete=false;
      this.ongoing=true;
     }
  })
}
@HostListener('window:scroll', []) onScrollEvent(){
    
  if(window.pageYOffset >15) {
    this.limit = this.limit+1;
  
  }
 

} 

}
