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
subscribes:any;
studentData:any;
ongoing:any;
complete:any;
data:any =[];
limit=2;
dis:boolean=false;
todelete:any=[];
  constructor(public service:QuestionService) { }

  ngOnInit(): void {
    localStorage.setItem('curr', JSON.stringify('Student List'));
    this.getStudent();
    
    
   
  }
  getStudent(){
    this.service.getStudentList(this.limit).subscribe((res)=>{
      this.data=res;
      console.log(res)

    })
  }
  onComplete(i:any){
    if(this.data[i].courseCompletedStatus == true){
      this.complete=true;
      this.ongoing=false;
     }else{
      this.complete=false;
      this.ongoing=true;
     }
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

toSubscribe(i:any){
  if(this.data[i].subscribeStatus === true){
    this.sub[i] = true;
   
  }else{
    this.sub[i] = false;
    
  }
}


toDelete(i:any){
this.todelete[i] = !this.todelete[i];
alert('Before delete the student make sure that student unsubscribed or not');
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

}
