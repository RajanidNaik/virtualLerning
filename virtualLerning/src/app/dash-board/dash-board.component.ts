import { Component, HostListener, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
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
limit=5;
student:any;
token:any;
ongoing:any;
complete:any;
todelete:any=[];
sub:any=[];
course:any;
progress:boolean=false;
courseLimit=7;
completeDeatails:any;
  constructor(private dialog:MatDialog,public service:QuestionService, public router:Router) { }

  ngOnInit(): void {
    localStorage.setItem('curr',JSON.stringify("Dashboard"));
    this.token=localStorage.getItem('token');
    this.service.getTotal().subscribe((x)=>{
    
    this.data = x;});

    this.getStudent();
    this.getCourseDetails();
   
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
  alert('Before delete the student make sure that student unsubscribed or not');
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
  deleteStudent(data:any){
    let body = [
      {
      userName:data.userName,
      courseId:data.courseId
    }
  ];
    console.log(body)
    this.service.toDelete(body)
    .subscribe({
      next:(res)=>{
        let response = res;
        if(response[0] == '{'){
         response = JSON.parse(response);
         alert(Object.values(response)[0]);
        }
       },
       error:(error)=>{
        alert(error.error);
       },
       complete:()=>{
        this.getStudent();
       }
    })
  }




getCourseDetails(){
  this.service.getCourse(this.courseLimit).subscribe({
    next:(res)=>{
      console.log(res);
      this.course = res;
    },
    error:(error)=>{
      alert(error.error);
    }
  })
}
 getVideoDetails(courseId:any){
this.service.getAddCourseDetails(courseId).subscribe({
  next:(res)=>{
    console.log(res);
    this.completeDeatails =res;
  },
  error:(error)=>{
    alert(error);
  },
  complete:()=>{
    sessionStorage.setItem('addCourseDetails',JSON.stringify(this.completeDeatails))
    this.router.navigateByUrl('/addcourse');
  }
})
 }




// @HostListener('window:scroll', []) onScrollEvent(){
//   if(document.body.scrollTop >5 || document.documentElement.scrollTop>0) {
//     this.limit = this.limit+3;
//     this.getStudent();
//     console.log('done')
//   }
// } 
onScrolling(event:any){
 
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
this.limit = this.limit +2;
this.getStudent()

  }
}
onScrollCourse(event:any){
  if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
    this.courseLimit = this.courseLimit +1;
    this.getCourseDetails();
    console.log('done')
    
      }
}
}
