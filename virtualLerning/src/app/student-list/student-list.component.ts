import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
isSubscribed:boolean=true;
studentData:any;
ongoing:any;
complete:any;
data:any;
limit=2;
  constructor(public service:QuestionService) { }

  ngOnInit(): void {
    localStorage.setItem('curr', JSON.stringify('Student List'));
    this.getStudent();
    
   
  }
  getStudent(){
    this.service.getStudentList(this.limit).subscribe((res)=>{
      console.log(res);
      this.data=res;
     if(this.data.courseCompletedStatus == true){
      this.complete=true;
      this.ongoing=false;
     }else{
      this.complete=false;
      this.ongoing=true;
     }
     
      
    })
  }
  load(){
    this.limit = this.limit+1;
    console.log(this.limit)
    this.getStudent();
    
   
  }

}
