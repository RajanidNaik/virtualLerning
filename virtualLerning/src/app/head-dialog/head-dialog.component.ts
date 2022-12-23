import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-head-dialog',
  templateUrl: './head-dialog.component.html',
  styleUrls: ['./head-dialog.component.css'],
})
export class HeadDialogComponent implements OnInit {
  completeDetails: any;
preDetails:any;
hide:any;
  constructor() {}

  ngOnInit(): void {
    // if (sessionStorage.getItem('certificateDetails')) {
    //   this.completeDetails = JSON.parse(
    //     sessionStorage.getItem('certificateDetails') || '[]'
    //   );
    //   console.log(this.completeDetails);
      
    // }
    if (sessionStorage.getItem('previewDetails')) {
      this.hide = true;
      this.preDetails = JSON.parse(
        sessionStorage.getItem('previewDetails') || '[]'
      );
      console.log(this.preDetails);
      
    }else{
      this.hide = false;
    }
  }
  captureScreen() {
    html2canvas(document.body).then(function (canvas) {
      var gererateImg = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      window.location.href = gererateImg;
    });
  }
  captureScreenData() {
    let data = document.getElementById('container')!;
    html2canvas(data).then(function (canvas) {
      var gererateImg = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
      window.location.href = gererateImg;
    });
  }
}
