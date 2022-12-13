import { Component, OnInit } from '@angular/core';
import { 
  FormGroup,
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
} from '@angular/forms';
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

  count: any;
  public Editor = ClassicEditor;
  constructor(public fb: FormBuilder, private dialog: MatDialog) {}
  category: any;
  info: any;

  ngOnInit(): void {
    this.category = localStorage.getItem('category');
    this.category = JSON.parse(this.category);
    this.videoForm = new FormGroup({
      videoTitle: new FormControl(''),
      category: new FormControl(''),
      overview: new FormControl(''),
      duration: new FormControl(''),
      certifcate: new FormControl(''),
      learning: this.fb.array([this.fb.control('')]),
      requirement: this.fb.array([this.fb.control('')]),
      chapter: this.fb.array([]),
    });

    this.add();
  }
  videoAdd(){
    this.array.push('v')
  }
  data(i: any) {
    sessionStorage.setItem('plus', JSON.stringify(i));
    this.count = i;
    if (sessionStorage.getItem('plus')) {
      this.info = JSON.parse(sessionStorage.getItem('plus') || '[]');
      console.log(this.info);
    }
  }

  show() {

    this.plus = !this.plus;

  }
  add() {
    let lan = new FormGroup({
      chaptername: new FormControl(''),
      sub: this.fb.array([this.addSubChapter()]),
    });
    (<FormArray>this.videoForm.controls['chapter']).push(lan);
    // this.videoForm.reset();
  }

  addSubChapter(){
      let subArray=new FormGroup({
          subChapterName: new FormControl(''),
          videoLink: new FormControl(''),
          supportDoc: new FormControl(''),
        })
  } 

  get getControl() {
    return (<FormArray>this.videoForm.controls['chapter']).controls;
  }
  get requirement() {
    return this.videoForm.get('requirement') as FormArray;
  }
  get learning() {
    return this.videoForm.get('learning') as FormArray;
  }

  addReq() {
    let lan = new FormControl('');
    (<FormArray>this.videoForm.controls['requirement']).push(lan);
  }

  addLear() {
    let lan = new FormControl('');
    (<FormArray>this.videoForm.controls['learning']).push(lan);
  }

  publish() {
    console.log(this.videoForm.value);
  }

  uploadVideo(event: any) {
    this.selected = event.target.files[0];
    console.log(this.selected);
  }

  checkBox(event: any) {
    console.log(event.checked);
    console.log(event.checked);
  }

  addCategory() {
    this.dialog.open(DialogCategoryComponent);
  }
}
