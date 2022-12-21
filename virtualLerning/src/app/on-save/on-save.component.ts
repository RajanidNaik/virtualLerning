import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
@Component({
  selector: 'app-on-save',
  templateUrl: './on-save.component.html',
  styleUrls: ['./on-save.component.css'],
})
export class OnSaveComponent implements OnInit {
  imageFile: any;
  completeDetails: any;
  constructor(public service: QuestionService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('certificateDetails')) {
      this.completeDetails = JSON.parse(
        sessionStorage.getItem('certificateDetails') || '[]'
      );
    }
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
        template: this.imageFile,
        userName: '',
        courseId: '',
      };
      console.log(data);
      this.service.saveCertificate(data).subscribe({
        next: (res) => {
          console.log(res);
          let response = res;
        if (response[0] == '{') {
          response = JSON.parse(response);
          alert(Object.values(response)[0]);
        }
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }
}
