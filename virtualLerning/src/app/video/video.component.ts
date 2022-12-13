import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  plus = false;
  isChecked: any;
  array = ['v'];
  selected: any;
  videoForm!: FormGroup;
  skills = new FormArray([]);
  selectedFile: any;
  count: any;
  public Editor = ClassicEditor;
  constructor(public fb: FormBuilder, private dialog: MatDialog) {}
  category: any;
  info: any;
  shows: any = [];

  ngOnInit(): void {
    this.category = localStorage.getItem('category');
    this.category = JSON.parse(this.category);
    this.videoForm = new FormGroup({
      videoTitle: new FormControl(''),
      category: new FormControl(''),
      subCategory: new FormControl(''),
      formatText: new FormControl(''),
      overview: new FormControl(''),
      learning: new FormControl(''),
      requirement: new FormControl(''),
      keyWords: new FormControl(''),
      level: new FormControl(''),
      chapter: this.fb.array([]),
    });
    this.add();
  }

  data(i: any) {
    sessionStorage.setItem('plus', JSON.stringify(i));
    this.count = i;
    if (sessionStorage.getItem('plus')) {
      this.info = JSON.parse(sessionStorage.getItem('plus') || '[]');
      console.log(this.info);
    }
  }


  supportUpload(event:any){
    console.log(this.selectedFile);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    
  }

  show(pos: any) {
    this.shows[pos] = !this.shows[pos];
  }
  add() {
    this.shows?.push(false);
    console.log(this.shows);
    let lan = new FormGroup({
      chaptername: new FormControl(''),
      sub: this.fb.array([]),
    });
    (<FormArray>this.videoForm.controls['chapter']).push(lan);
    // this.videoForm.reset();
  }

  get getControl() {
    return (<FormArray>this.videoForm.controls['chapter']).controls;
  }

  publish() {
    console.log(this.videoForm.value);
  }

  addCategory() {
    this.dialog.open(DialogCategoryComponent);
  }
}