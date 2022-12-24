import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from '../dialogService/dialog.service';

@Component({
  selector: 'app-sub-cat',
  templateUrl: './sub-cat.component.html',
  styleUrls: ['./sub-cat.component.css'],
})
export class SubCatComponent implements OnInit {
  category: any;
  selectedFile: any;
  courseId: any;
  constructor(
    private dServ: DialogService,
    private router: Router,
    private dialogRef: MatDialog
  ) {}
  image: any;
  categoryForm = new FormGroup({
    categoryName: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.category = localStorage.getItem('category');
    this.category = JSON.parse(this.category);
    if (sessionStorage.getItem('catId')) {
      this.courseId = sessionStorage.getItem('catId');
      console.log(this.courseId);
    } else {
      this.dialogRef.closeAll();
    }
  }
  add() {
    const body = {
      categoryId: this.courseId,
      subCategoryName: this.categoryForm.value.categoryName,
    };
    this.dServ.addSubCategory(body).subscribe((data) => console.log(data));
    sessionStorage.removeItem('catId');
  }
}











// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCsjX_w_zYJkF-aoLZ2qbwX9iWwFRCv4k8",
//   authDomain: "virtualearn-26e6b.firebaseapp.com",
//   projectId: "virtualearn-26e6b",
//   storageBucket: "virtualearn-26e6b.appspot.com",
//   messagingSenderId: "685561219387",
//   appId: "1:685561219387:web:b11ca28f458630d773cf1e"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);