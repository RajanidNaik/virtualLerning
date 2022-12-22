import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { VideoServiceService } from '../videoService/video-service.service';
import { SubCatComponent } from '../sub-cat/sub-cat.component';
import{AngularFireStorage,AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';
import { addSub, AddVideo } from '../add-video';

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
  length = 0;
  diffLevel = ['Advanced', 'Beginner'];
  videoForm!: FormGroup;
  skills = new FormArray([]);
  selectedFile: any;
  category1: any;
  subCa: any;
  count: any;
  status:any;
  cIndex = 0;
  previewVideo: any;

  public Editor = ClassicEditor;
  currVideo = '';
  sIndex = 0;

  completeDetails: any;
  data: any;
  subcategory: any;

  ref!: AngularFireStorageReference;
  task!: AngularFireUploadTask;
  uploadState!: Observable<unknown>;
  uploadProgress!: Observable<unknown>;

//edit upload failed thing
addVideo = new AddVideo();
chapterArray:any
hide:any;

addSubchapter = new addSub();
lessonArray:any;


  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private videoSer: VideoServiceService,
    private af: AngularFireStorage
  ) {}
    response:any
  adding = true;
  currVal = 99;
  category: any;
  info: any;
  shows: any = [];
  valid = true;
  ngOnInit(): void {
    console.log(this.status);
    
     this.response = sessionStorage.getItem('CourseID')||239;
    console.log(typeof(this.response))
    
    this.videoForm = new FormGroup({
      videoTitle: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl('', [Validators.required]),
      formatText: new FormControl('', [Validators.required]),
      overview: new FormControl('', [Validators.required]),
      learning: new FormControl('', [Validators.required]),
      requirement: new FormControl('', [Validators.required]),
      coursePhoto: new FormControl('', [Validators.required]),
      previewVideo: new FormControl('', [Validators.required]),
      keyWords: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required]),
      chapter: this.fb.array([
        this.fb.group({
          chapterName: new FormControl('', [Validators.required]),
          lessonsList: this.fb.array([
            this.fb.group({
              lessonName: new FormControl(''),
              lessonDuration: new FormControl('00:30:20'),
              videoLink: new FormControl(''),
            }),
          ]),
        }),
      ]),
    });

    if (sessionStorage.getItem('addCourseDetails')) {
      this.hide = true;
      this.completeDetails = JSON.parse(
        sessionStorage.getItem('addCourseDetails') || '[]'
      );
      console.log(this.completeDetails);
      this.setValue();
      
      this.chapterArray = this.completeDetails.chapter;
      console.log('2')
    }else{
      this.hide = false;
    }


    this.videoSer.getChategory().subscribe((data) => {
      this.category1 = JSON.parse(data);
    });
    this.videoSer.getSubCat().subscribe((data) => {
      this.subCa = JSON.parse(data);
      console.log(this.subCa);
    });
  }
  storeCatId(item: any) {
    sessionStorage.setItem('catId', item.categoryId);
  }

  show(pos: any) {
    this.shows[pos] = !this.shows[pos];
  }

  publish() {
    console.log(this.videoForm.value);
  }
  selected() {
    sessionStorage.removeItem('catId');
  }
  addCategory() {
    this.dialog.open(DialogCategoryComponent);
  }
  addSubCategory() {
    this.dialog.open(SubCatComponent);
  }

  chapters(): FormArray {
    return this.videoForm.get('chapter') as FormArray;
  }

  newChapter(): FormGroup {
    return this.fb.group({
      chapterName: new FormControl('', [Validators.required]),
      lessonsList: this.fb.array([this.newSubChapter()]),
    });
  }

  addChapter() {
    if(this.status == true){
      console.log("True");
      
      console.log(this.uploadFailed[this.cIndex])
       console.log(this.uploadSuccess[this.cIndex])
    }
    else{
      console.log("False");
      
       console.log(this.uploadFailed[this.cIndex])
       console.log(this.uploadSuccess[this.cIndex])
    }
    this.uploadFailed.push(false);
    this.uploadSuccess.push(false);
    this.sIndex = 0;
    this.chapters().push(this.newChapter());
  }

  subChapters(chapIndex: number): FormArray {
    return this.chapters().at(chapIndex).get('lessonsList') as FormArray;
  }

  newSubChapter(): FormGroup {
    return this.fb.group({
      lessonName: new FormControl(''),
      lessonDuration: new FormControl('00:30:20'),
      videoLink: new FormControl(''),
    });
  }
  addSubChapter(chapIndex: number) {
    this.uploadCheck();
    this.subChapters(chapIndex).push(this.newSubChapter());
  }

  setcurrVal() {
    this.currVal =
      this.videoForm.value.chapter[this.cIndex].lessonsList[
        this.sIndex
      ].lessonName;
  }
  setcurrVideo() {
    this.currVideo =
      this.videoForm.value.chapter[this.cIndex].lessonsList[
        this.sIndex
      ].videoLink;
  }

  storesIndex(index: any, chapIndex: any) {
    this.sIndex = index;
    this.cIndex = chapIndex;
  }


  setValue() {
   
    this.videoForm.patchValue({
      videoTitle: this.completeDetails.courseName,
      category: this.completeDetails.categoryName,
      subCategory: this.completeDetails.subCategoryName,
      formatText: this.completeDetails.courseTagLine,
      overview: this.completeDetails.description,
      learning: this.completeDetails.learningOutCome,
      requirement: this.completeDetails.requirements,
      coursePhoto: this.completeDetails.requirements,
      previewVideo: this.completeDetails.previewVideo,
      level: this.completeDetails.difficultyLevel,
      keyWords: this.completeDetails.keywords[0]['keyword'],
    });
  }
  storeIndex(index: any) {
    sessionStorage.setItem('Index', index);
  }

  appendSub() {
    let index = sessionStorage.getItem('Index');
  }

  display() {
    let index: any = sessionStorage.getItem('Index');
    this.sIndex = parseInt(index);
  }
  setSubChap(value: any) {
    this.videoForm.value.chapter[this.cIndex].lessonsList[
      this.sIndex
    ].lessonName = value;
  }

  uploadCoursePhoto(event: any) {
    console.log(event);

    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    let filePath = id;

    this.ref = this.af.ref(id);
    this.task = this.af.upload(filePath, file);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    // this.uploadProgress = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url: any) => {
            this.videoForm.patchValue({
              coursePhoto: url,
            });
          });
        })
      )
      .subscribe();
  }
  uploadVideo(event: any) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    let filePath = id;

    this.ref = this.af.ref(id);
    this.task = this.af.upload(filePath, file);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    // this.uploadProgress = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url: any) => {
            this.videoForm.patchValue({
              previewVideo: url,
            });
          });
        })
      )
      .subscribe();
  }

  choice() {
    this.adding = false;
  }

  addSubvideo(event: any) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    let filePath = id;

    this.ref = this.af.ref(id);
    this.task = this.af.upload(filePath, file);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url: any) => {
            this.videoForm.value.chapter[this.cIndex].lessonsList[
              this.sIndex
            ].videoLink = url;
            console.log(
              this.videoForm.value.chapter[this.cIndex].lessonsList[this.sIndex]
                .videoLink
            );
          });
        })
      )
      .subscribe();

    this.videoForm.value.chapter[this.cIndex].lessonsList[
      this.sIndex
    ].videoLink = this.currVideo;
  }

  select(item: any) {}

  // log(a:any){
  // console.log(typeof(a));

  // }
  addCourse() {
    const body = {
      courseName: this.videoForm.value.videoTitle,
      categoryName: this.videoForm.value.category,
      subCategoryName: this.videoForm.value.subCategory,
      courseTagLine: this.videoForm.value.formatText,
      description: this.videoForm.value.overview,
      learningOutCome: this.videoForm.value.learning,
      requirements: this.videoForm.value.requirement,
      difficultyLevel: this.videoForm.value.level,
      coursePhoto: this.videoForm.value.coursePhoto,
      previewVideo: this.videoForm.value.previewVideo,
      courseKeyword: this.videoForm.value.keyWords,
    };
    const body2 = {
      courseName: this.videoForm.value.videoTitle,
      chapterDataRequestList:this.videoForm.value.chapter
    };
    this.videoSer.overview(body)
    .subscribe({
        next: (data: any) => {
            alert('Request Sent Succefully');
            console.log(data);
            sessionStorage.setItem('response2', data);
            this.response = JSON.parse(data);
            this.response = this.response.message.match(/\d+$/)[0];
            sessionStorage.setItem('CourseID',this.response);
          },
          error: (data: any) => {
              console.log(data);
            },
          });
    this.videoSer.addChapters(body2)
    .subscribe({
            next: (data: any) => {
            alert('Request Sent Succefully');
            console.log(data);
            sessionStorage.setItem('response2',data)

          },
          error: (data: any) => {
              console.log(data);
            },
          })

  }

  filedrop(event: NgxFileDropEntry[]) {
    console.log(event);
  }
  next() {
    this.sIndex++;
    this.setcurrVal();
    console.log('BNEX');
  }
  prev() {
    this.sIndex--;
    this.setcurrVal();
    console.log(
      this.videoForm.value.chapter[this.cIndex].lessonsList[this.sIndex]
        .lessonName
    );
  }
  setlength(item: any) {
    this.length = item;
  }
  preview(){
      console.log(this.videoForm.value);
  }

  uploadCheck(){
    if (this.videoForm.value.chapter[this.cIndex].lessonsList[this.sIndex].videoLink) console.log(true);
  
    else console.log(false);
    
    
  }

//edit
addNewChapter(){
  this.addVideo = new AddVideo();
  this.chapterArray.push(this.addVideo);
}
addNewSub(i:any){
  this.lessonArray = this.chapterArray[i].lessonList;
  this.addSubchapter = new addSub();
this.lessonArray.push(this.addSubchapter);
}
onPublish(){
  
  const body = {
    courseName: this.videoForm.value.videoTitle,
    categoryName: this.videoForm.value.category,
    subCategoryName: this.videoForm.value.subCategory,
    courseTagLine: this.videoForm.value.formatText,
    description: this.videoForm.value.overview,
    learningOutCome: this.videoForm.value.learning,
    requirements: this.videoForm.value.requirement,
    difficultyLevel: this.videoForm.value.level,
    coursePhoto: this.videoForm.value.coursePhoto,
    previewVideo: this.videoForm.value.previewVideo,
    courseKeyword: this.videoForm.value.keyWords,
  };
  const body2 = {
    courseName: this.videoForm.value.videoTitle,
    chapterDataRequestList:this.chapterArray
  };
  console.log(body, body2);
  this.videoSer.overview(body)
  .subscribe({
      next: (data: any) => {
          alert('Request Sent Succefully');
          console.log(data);
          sessionStorage.setItem('response2', data);
          this.response = JSON.parse(data);
          this.response = this.response.message.match(/\d+$/)[0];
          sessionStorage.setItem('CourseID',this.response);
        },
        error: (data: any) => {
            console.log(data);
          },
        });
  this.videoSer.addChapters(body2)
  .subscribe({
          next: (data: any) => {
          alert('Request Sent Succefully');
          console.log(data);
          sessionStorage.setItem('response2',data)

        },
        error: (data: any) => {
            console.log(data);
          },
        })
}



removeAddChapter(i:any){
  this.chapterArray.splice(i);
}


}
