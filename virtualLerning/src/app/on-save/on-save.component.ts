import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionService } from '../question.service';
@Component({
  selector: 'app-on-save',
  templateUrl: './on-save.component.html',
  styleUrls: ['./on-save.component.css'],
})
export class OnSaveComponent implements OnInit {
  imageFile: any;
  completeDetails: any;
  preDetails: any;
  constructor(public service: QuestionService, private fb: FormBuilder) {}
  chapForm!: FormGroup;
  ngOnInit(): void {
    
    if (sessionStorage.getItem('previewDetails')) {
      this.preDetails = JSON.parse(
        sessionStorage.getItem('previewDetails') || '[]'
      );
      console.log(this.preDetails);
      
    }
    this.chapForm = this.fb.group({
      template:[''],
      userName:[this.preDetails.name],
      courseId:[this.preDetails.courseId]
    })
  }
  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log(event.target.files[0]);
    }
  }
  saveCertificate() {
    if (sessionStorage.getItem('certificateDetails')) {
      let data: any = {
        'certificate': this.imageFile,
        'userName': this.preDetails.name ,
        'courseId': this.preDetails.courseId,
      };
      console.log(data);
      this.service.saveCertificate(data).subscribe({
        next: (res) => {
          console.log(res);
          let response = res;
        alert(response);
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }
}
