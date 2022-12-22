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
  constructor(public service: QuestionService, private fb: FormBuilder) {}
  chapForm!: FormGroup;
  ngOnInit(): void {
    if (sessionStorage.getItem('certificateDetails')) {
      this.completeDetails = JSON.parse(
        sessionStorage.getItem('certificateDetails') || '[]'
      );
      console.log(this.completeDetails)
    }
    this.chapForm = this.fb.group({
      template:[''],
      userName:[this.completeDetails[0].fullName],
      courseId:[this.completeDetails[0].courseId]
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
        'userName': this.completeDetails[0].fullName ,
        'courseId': this.completeDetails[0].courseId,
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
