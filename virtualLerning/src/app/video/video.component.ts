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
  category:any;

  ngOnInit(): void {
    this.category=localStorage.getItem('category');
    this.category=JSON.parse(this.category);
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
    // this.addSub();
  }

  show(i: any) {
    this.count = 0;
    if (this.videoForm.controls['chapter'].dirty) {
      if (this.count == i) {
        this.plus = !this.plus;
        console.log(this.count);
      } else {
        this.plus = false;
      }
    }
  }

  add() {
    let lan = new FormGroup({
      chaptername: new FormControl(''),
      sub: new FormControl(''),
    });
    (<FormArray>this.videoForm.controls['chapter']).push(lan);
    console.log(this.videoForm.value);
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
