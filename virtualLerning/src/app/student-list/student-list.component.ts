import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { DeleteStudentComponent } from '../delete-student/delete-student.component';
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
isSubscribed:any=[];
sub:any=[];
studentData:any;
ongoing:any;
complete:any;
data:any =[];
limit=2;
dis:boolean=false;
todelete:any=[];
  constructor(public service:QuestionService,private dialog:MatDialog) { }

  ngOnInit(): void {
    localStorage.setItem('curr', JSON.stringify('Student List'));
    this.getStudent();
    
    
   
  }
  getStudent(){
    this.service.getStudentList(this.limit).subscribe((res)=>{
      this.data=res;
      console.log(res)
     if(this.data.courseCompletedStatus == true){
      this.complete=true;
      this.ongoing=false;
     }else{
      this.complete=false;
      this.ongoing=true;
     }
    //  if(this.data.subscribeStatus == true){
    //    this.isSubscribed = true;
    //    console.log(this.isSubscribed)
    //  }else{
    //   this.isSubscribed = false;
    //   console.log(this.isSubscribed)
    //  }
     
      
    })
  }
  load(){
    if(this.data.message == 'null' ){
          this.dis = true;
          console.log(this.dis)
          console.log('done')
   }
   else{
    this.limit = this.limit+1;
    console.log(this.limit);
   }
   this.getStudent();
  }
// openDialog(){
//   const dialogConfig =new MatDialogConfig();
//   dialogConfig.disableClose = true;
//   dialogConfig.autoFocus = true;
//   this.dialog.open(DeleteStudentComponent,dialogConfig)  
// }
toSubscribe(i:any){
  if(this.data[i].subscribeStatus == true){
    this.sub = true;
  }else{
    this.sub = false;
  }
}
onsub(i:any){
  this.sub[i] = !this.sub[i];
}
toDelete(i:any){
this.todelete[i] = !this.todelete[i];
}
deleteStudent(data:any){
  const body = [
    {
      userName:data.userName,
      courseId:data.courseId
    },
  ];
  console.log(body)
  this.service.toDelete(body).subscribe({
    next:(data) =>{
      console.log(data);
      
    },
    error:(data)=>{
      console.log(data);
      
    }
  })
}
subscribe(body:any){
this.service.toSubscribe(body).subscribe((res)=>{
  console.log(res);
})
}
}
