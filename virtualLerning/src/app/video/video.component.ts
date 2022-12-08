import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  plus = false;
  array=["v"]
  videoForm: any;
  skills = new FormArray([]);
  public Editor = ClassicEditor;
  constructor(public fb: FormBuilder) {}
  category:Array<string>=["Design","Development","Business","Music","Finance","Health","IT","Marketting","LifeStyle","Photogrphy"];

  ngOnInit(): void {
    this.videoForm = this.fb.group({
      videoTitle: new FormControl(''),
      category: new FormControl(''),
      overview:new FormControl(''),
      chapter: this.fb.array([
        this.fb.group({
          chaptername: [''],
              subChapter: this.fb.array([
                 this.fb.group({
                subChapterName:new FormGroup(''),
            })
          ])
        }),
      ]),

      // ({
      //   chaptername: new FormControl(''),
      //   subChapter: this.fb.group({
      //     subChapterName: new FormControl(''),
      //   }),
      // }),
    });
  }

  show() {
    this.plus = !this.plus;
  }
  add() {
   
    this.array.push("v");
  }
  publish(){
     console.log(this.videoForm.value);
  }
}
