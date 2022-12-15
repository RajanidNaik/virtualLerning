import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { VideoServiceService } from '../videoService/video-service.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  plus = false;
  isChecked: any;
  selected: any;
  videoForm!: FormGroup;
  skills = new FormArray([]);
  selectedFile: any;
  category1:any
  count: any;
  public Editor = ClassicEditor;
  subcategory: any;
  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private videoSer:VideoServiceService) {}
  category: any;
  info: any;
  shows: any = [];

  ngOnInit(): void {
     this.videoSer.getChategory().subscribe(
      (data)=>{
          this.category = JSON.parse(data);
     });
     this.videoSer.getSubCat().subscribe((data) => {
       this.subcategory = JSON.parse(data);
     });
    this.videoForm = new FormGroup({
      videoTitle: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl('', [Validators.required]),
      formatText: new FormControl('', [Validators.required]),
      overview: new FormControl('', [Validators.required]),
      learning: new FormControl('', [Validators.required]),
      requirement: new FormControl('', [Validators.required]),
      keyWords: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      chapter: this.fb.array([]),
    });
    this.addChapter();
  }

  supportUpload(event: any) {
    console.log(this.selectedFile);
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  show(pos: any) {
    this.shows[pos] = !this.shows[pos];
  }

  publish() {
    console.log(this.videoForm.value);
  }

  addCategory() {
    this.dialog.open(DialogCategoryComponent);
  }

  chapters(): FormArray {
    return this.videoForm.get('chapter') as FormArray;
  }

  newChapter(): FormGroup {
    return this.fb.group({
      chapterName: new FormControl('', [Validators.required]),
      subChapter: this.fb.array([]),
    });
  }

  addChapter() {
    this.chapters().push(this.newChapter());
  }

  subChapters(chapIndex: number): FormArray {
    return this.chapters().at(chapIndex).get('subChapter') as FormArray;
  }

  newSubChapter(): FormGroup {
    return this.fb.group({
      subChapterName: new FormGroup('', [Validators.required]),
    });
  }
  addSubChapter(chapIndex: number) {
    this.subChapters(chapIndex).push(this.newSubChapter());
  }

}



















// <div class="suBcategory">
//       <div class="text">Sub Category</div>
//       <div class="titleInputV">
//         <select formControlName="subCategory" type="text">
//           <option value="" selected>Sub Category</option>
//           <option
//             *ngFor="let item of subcategory"
//             [value]="item.categoryName"
//             [selected]="item === 'Design'"
//           >
//             {{ item.categoryName }}
//           </option>
//           <option (click)="addCategory()" value="">Add new +</option>
//         </select>
//       </div>
//       <div
//         *ngIf="videoForm.get('subCategory')?.errors?.['required'] "
//         class="error1"
//       >
//         Required
//       </div>
//     </div>