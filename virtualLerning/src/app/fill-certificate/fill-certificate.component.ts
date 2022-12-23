import { Component, OnInit } from '@angular/core';
import { window } from 'rxjs';
import { QuestionService } from '../question.service';
@Component({
  selector: 'app-fill-certificate',
  templateUrl: './fill-certificate.component.html',
  styleUrls: ['./fill-certificate.component.css']
})
export class FillCertificateComponent implements OnInit {
  certificateDetails: any;
  hide:any;
  constructor(public service: QuestionService) { }

  ngOnInit(): void {
    this.getCertificateStudentList();
  }
  getCertificateStudentList() {
    this.service.getCertificateStudent().subscribe({
      next: (res) => {
        console.log(res);
        this.hide = true;
        this.certificateDetails = res;
        console.log(this.certificateDetails);
      },
      error: (error) => {
        alert(error.error.message);
        this.hide = false;
        if(sessionStorage.getItem('certificateDetails')){
          sessionStorage.removeItem('certificateDetails');
          if(sessionStorage.getItem('student')){
            sessionStorage.removeItem('student');
          }
          if(sessionStorage.getItem('previewDetails')){
            sessionStorage.removeItem('previewDetails');
          }
         
        }
       
      },
      complete: () => {
        sessionStorage.setItem(
          'certificateDetails',
          JSON.stringify(this.certificateDetails)
        );
       
        
      },
    });
  }
  toGet(i:any){
    sessionStorage.setItem('student',JSON.stringify(this.certificateDetails[i]))
    
  }
}
