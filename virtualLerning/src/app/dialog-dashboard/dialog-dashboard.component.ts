import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
@Component({
  selector: 'app-dialog-dashboard',
  templateUrl: './dialog-dashboard.component.html',
  styleUrls: ['./dialog-dashboard.component.css']
})
export class DialogDashboardComponent implements OnInit {
  completeDetails: any;
  id:any;
  constructor( public service:QuestionService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('deleteCourseDetails')){
      this.completeDetails = JSON.parse(sessionStorage.getItem('deleteCourseDetails') || '[]');
      console.log(this.completeDetails);
    }
    if(sessionStorage.getItem('courseId')){
      this.id = JSON.parse(sessionStorage.getItem('courseId') || '[]');
      console.log(this.id);
    }
  
  }
  deleteCourse(){
    this.service.deleteCourse(this.id).subscribe({
      next:(res)=>{
        let response = res;
        console.log(response);
        if(response[0] == '{'){
         response = JSON.parse(response);
         alert(Object.values(response)[0]);
        }
      },
      error:(error)=>{
        alert(error.error)
      },
      complete:()=>{

      }
    })
  }

}
