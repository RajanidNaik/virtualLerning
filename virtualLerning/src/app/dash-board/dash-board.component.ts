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
limit=8;
student:any;
token:any;
ongoing:any;
complete:any;
todelete:any=[];
sub:any=[];
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
toDelete(i:any){
  this.todelete[i] = !this.todelete[i];
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
    console.log(this.data)
  })
}
getStudent(){
  this.service.getStudentList(this.limit).subscribe((data)=>{
    this.student = data;
    console.log(this.student)
  })
}
onComplete(id:any){
  if(this.student[id].courseCompletedStatus == true){
    this.complete=true;
    this.ongoing=false;
   }else{
    this.complete=false;
    this.ongoing=true;
   }
}
toSubscribe(i:any){
  if(this.student[i].subscribeStatus === true){
    this.sub[i] = true;
   
  }else{
    this.sub[i] = false;
    
  }
}
onsub(i:any){
  this.sub[i] = !this.sub[i];
  
}
subscribe(data:any,i:any){
  this.onsub(i);
    let body = 
      {
      userName:data.userName,
      courseId:data.courseId
      
    }
  this.service.toSubscribe(body).subscribe((res)=>{
    console.log(res);
    alert(res.message);
    this.getStudent();
  })
  }



@HostListener('window:scroll', []) onScrollEvent(){
  if(document.body.scrollTop >5 || document.documentElement.scrollTop>0) {
    this.limit = this.limit+3;
    this.getStudent();
    console.log('done')
  }
} 

}
