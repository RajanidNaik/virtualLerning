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
  uploadSuccess = [false];
  uploadFailed = [false];
  isChecked: any;
  id: any;
  subChapVal = '';
  selected: any;
  diffLevel = ['Advanced', 'Beginner'];
  videoForm!: FormGroup;
  skills = new FormArray([]);
  selectedFile: any;
  category1: any;
  subCa: any;
  count: any;
  cIndex = 0;
  public Editor = ClassicEditor;

  sIndex = 0;

  completeDetails: any;
  subcategory: any;
  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private videoSer: VideoServiceService
  ) {}

  category: any;
  info: any;
  shows: any = [];

  ngOnInit(): void {
    this.category = localStorage.getItem('category');
    this.category = JSON.parse(this.category);

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
    if (sessionStorage.getItem('addCourseDetails')) {
      this.completeDetails = JSON.parse(
        sessionStorage.getItem('addCourseDetails') || '[]'
      );
      console.log(this.completeDetails);
      this.setValue();
    }
    this.videoSer.getChategory().subscribe((data) => {
      this.category1 = JSON.parse(data);
    });
    this.videoSer.getSubCat().subscribe((data) => {
      this.subCa = JSON.parse(data);
    });
  }

  supportUpload(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  thumbnailUpload(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  show(pos: any) {
    this.shows[pos] = !this.shows[pos];
  }

  publish() {
    console.log(this.videoForm.value.chapter);
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
      subChapter: this.fb.array([this.newSubChapter()]),
    });
  }

  addChapter() {
    this.uploadFailed.push(false);
    this.uploadSuccess.push(false);
    this.chapters().push(this.newChapter());
  }

  subChapters(chapIndex: number): FormArray {
    return this.chapters().at(chapIndex).get('subChapter') as FormArray;
  }

  newSubChapter(): FormGroup {
    return this.fb.group({
      subChapterName: new FormControl(' ', [Validators.required]),
    });
  }
  addSubChapter(chapIndex: number) {
    this.subChapters(chapIndex).push(this.newSubChapter());
    this.id.value = '';
  }

  //add details
  setValue() {
    this.videoForm.patchValue({
      videoTitle: this.completeDetails.courseName,
      category: this.completeDetails.categoryName,
      subCategory: this.completeDetails.subCategoryName,
      formatText: this.completeDetails.courseTagLine,
      overview: this.completeDetails.description,
      learning: this.completeDetails.learningOutCome,
      requirement: this.completeDetails.requirements,
      level: this.completeDetails.difficultyLevel,
      keyWords: this.completeDetails.keywords[0]['keyword'],
      chapter: [
        {
          chapterName: this.completeDetails.chapter[0]['chapterName'],
          subChapter: [
            {
              subChapterName:
                this.completeDetails.chapter[0]['lessonList'][0]['lessonName'],
            },
          ],
        },
      ],
    });
  }
  storeIndex(index: any, chapIndex: any) {
    this.sIndex = index;
    this.cIndex = chapIndex;
  }
  display() {
    let index: any = sessionStorage.getItem('Index');
    this.sIndex = parseInt(index);
  }
  setSubChap(value: any, i: any) {
    this.videoForm.value.chapter[this.cIndex].subChapter[
      this.sIndex
    ].subChapterName = value;
    this.id = i;
  }
}
