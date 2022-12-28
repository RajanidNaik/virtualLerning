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
import { NgxFileDropEntry } from 'ngx-file-drop';
import { VideoServiceService } from '../videoService/video-service.service';
import { SubCatComponent } from '../sub-cat/sub-cat.component';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';
import { addSub, AddVideo } from '../add-video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  addNewChap: boolean = true;

  plus = false;
  publishOver = false;
  uploadSuccess = [false];
  uploadFailed = [false];
  isChecked: any;
  id: any;
  subChapVal = '';
  length = 0;
  i = 0;
  diffLevel = ['Advanced', 'Beginner'];
  videoForm!: FormGroup;
  skills = new FormArray([]);
  selectedFile: any;
  category1: any;
  subCa: any;
  count: any;
  status = true;
  cIndex = 0;
  previewVideo: any;
  editurl: any;
  editName: any;
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
  chapterArray: any = [];
  hide: any;

  addSubchap = new addSub();
  lessonArray: any = [];

  subcatId: any;
  currInd: any;
  savedata: any;
  constructor(
    public fb: FormBuilder,
    private dialog: MatDialog,
    private videoSer: VideoServiceService,
    private af: AngularFireStorage
  ) {}
  response: any;
  adding = true;
  currVal = 99;
  category: any;
  info: any;
  shows: any = [];
  valid = true;
  ngOnInit(): void {
    this.getId();
    console.log(this.status);

    this.response = sessionStorage.getItem('CourseID');
    console.log(typeof this.response);

    this.getCategory();
    this.getSubCategory();
    this.videoForm = new FormGroup({
      videoTitle: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subCategory: new FormControl(''),
      formatText: new FormControl('', [Validators.required]),
      overview: new FormControl('', [
        Validators.required,
        Validators.maxLength(550),
      ]),
      learning: new FormControl('', [Validators.required]),
      requirement: new FormControl('', [Validators.required]),
      coursePhoto: new FormControl('', [Validators.required]),
      previewVideo: new FormControl('', [Validators.required]),
      keyWords: new FormControl('', [
        Validators.required,

        Validators.pattern('^[a-zA-Z][-a-zA-Z, ]{1,}'),Validators.maxLength(30)
      ]),
      level: new FormControl('', [Validators.required]),
      chapter: this.fb.array([
        this.fb.group({
          chapterName: new FormControl('', [Validators.required]),
          lessonsList: this.fb.array([
            this.fb.group({

              lessonName: new FormControl('', [Validators.required]),
              lessonDuration: new FormControl(null),


              videoLink: new FormControl(null),

             
            }),
          ]),
        }),
      ]),
    });
    if (localStorage.getItem('saves')) {
      this.savedata = JSON.parse(localStorage.getItem('saves') || '[]');
      this.restoreSave(this.savedata);
    }

    if (sessionStorage.getItem('addCourseDetails')) {
      this.hide = true;
      this.completeDetails = JSON.parse(
        sessionStorage.getItem('addCourseDetails') || '[]'
      );
      console.log(this.completeDetails);
      this.setValue();

      this.chapterArray = this.completeDetails.chapter;
      console.log(this.chapterArray);
    } else {
      this.hide = false;
    }

    this.videoSer.getChategory().subscribe((data) => {
      this.category1 = JSON.parse(data);
      // console.log(this.category1);
    });
    this.videoSer.getSubCat(this.subcatId).subscribe((data) => {
      this.subCa = JSON.parse(data);
      console.log(this.subCa);
    });
  }
  value(e: any) {
    e.target.value;
  }

  getId() {
    if (sessionStorage.getItem('catId')) {
      this.subcatId = sessionStorage.getItem('catId');
    }
  }
  storeCatId(item: any) {
    let id = item.target.value;

    console.log(id);
    if (id != '') {
      // console.log(this.category1);

      let array: any = ([] = this.category1);
      array = this.category1.filter((item: any) => {
        return item.categoryName == id;
      });
      console.log(array[0].categoryId);
      sessionStorage.setItem('catId', array[0].categoryId);
    } else {
      this.addCategory();
    }
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
  addSubCategory(e: any) {
    console.log(e.target.value);
    if (e.target.value == '') this.dialog.open(SubCatComponent);
  }

  reload() {
    this.getCategory();
  }
  reloadT() {
    console.log('2');

    this.getSubCategory();
  }
  getCategory() {
    this.videoSer.getChategory().subscribe((data) => {
      this.category1 = JSON.parse(data);
      console.log(this.category1);
    });
  }
  getSubCategory() {
    this.videoSer.getSubCat(this.subcatId).subscribe((data) => {
      console.log(data);
      this.subCa = JSON.parse(data);
      console.log(this.subCa);
    });
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
    if (this.status == true) {
      console.log('True');

      console.log(this.uploadFailed[this.cIndex]);
      console.log(this.uploadSuccess[this.cIndex]);
    } else {
      console.log('False');

      console.log(this.uploadFailed[this.cIndex]);
      console.log(this.uploadSuccess[this.cIndex]);
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
      lessonName: new FormControl('', [Validators.required]),
      lessonDuration: new FormControl(null),
      videoLink: new FormControl(null),

    });
  }
  addSubChapter(chapIndex: number) {
    this.uploadCheck();
    this.previewVideo = '';
    this.subChapters(chapIndex).push(this.newSubChapter());
  }

  setcurrVal() {
    this.currVal =
      this.videoForm.value.chapter[this.cIndex].lessonsList[
        this.sIndex
      ].lessonName;
  }

  // setcurrVal1(){
  //   this.currVal = this.chapterArray[this.cIndex].lessonList[this.sIndex].lessonName
  // }
  setcurrVideo() {
    this.currVideo =
      this.videoForm.value.chapter[this.cIndex].lessonsList[
        this.sIndex
      ].videoLink;
  }

  // setcurrVideo2() {
  //   this.currVideo =
  //   this.chapterArray[this.cIndex].lessonList[this.sIndex].videoLink ;
  // }

  storesIndex(subindex: any, chapIndex: any) {
    this.sIndex = subindex;
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
  setSubChap2(value: any, index: any) {
    this.subChapters(index).at(this.currInd).get('lessonName')?.setValue(value);
    this.editName = value;
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
  dragAndDrop(event: any) {
    console.log(event[0]);
    console.log(typeof event[0].type);
    if (event[0].type == 'video/mp4') {
      const id = Math.random().toString(36).substring(2);
      const file = event[0];
      let filePath = id;

      this.ref = this.af.ref(id);
      this.task = this.af.upload(filePath, file);
      this.uploadProgress = this.task.percentageChanges();
      console.log(this.uploadProgress);

      this.task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.ref.getDownloadURL().subscribe((url: any) => {
              this.subChapters(this.cIndex)
                .at(this.sIndex)
                .get('videoLink')
                ?.setValue(url);
              this.previewVideo = url;
              this.subChapters(this.cIndex)
                .at(this.sIndex)
                .get('lessonDuration')
                ?.setValue('00:00:20');
            });
          })
        )
        .subscribe();
    } else alert('Only add Videos');
  }
  addSubvideo(event: any, cInd: any) {
    console.log(this.currInd);

    console.log(event.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    let filePath = id;

    this.ref = this.af.ref(id);
    this.task = this.af.upload(filePath, file);
    this.uploadProgress = this.task.percentageChanges();
    console.log(this.uploadProgress);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url: any) => {
            this.subChapters(cInd)
              .at(this.sIndex)
              .get('videoLink')
              ?.setValue(url);
            this.previewVideo = url;
            this.subChapters(cInd)
              .at(this.sIndex)
              .get('lessonDuration')
              ?.setValue('00:00:20');
          });
        })
      )
      .subscribe();
  }
  addSubvideo2(event: any) {
    const id = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    let filePath = id;

    this.ref = this.af.ref(id);
    this.task = this.af.upload(filePath, file);
    // this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    console.log(this.uploadProgress);

    this.task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.ref.getDownloadURL().subscribe((url: any) => {
            this.chapterArray[this.cIndex].lessonList[this.sIndex].videoLink =
              url;
            console.log(url);
            this.currVideo = url;
          });
        })
      )
      .subscribe();
  }

  showIt() {
    console.log(this.previewVideo);
    console.log(this.videoForm.value.chapter);
  }
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
      chapterDataRequestList: this.videoForm.value.chapter,
    };
    console.log(body);
    console.log(body2);

    this.videoSer.overview(body).subscribe({
      next: (data: any) => {
        // alert('Request Sent Succefully');
        console.log(data);
        let response = data;
        if (response[0] == '{') {
          response = JSON.parse(response);
          alert(Object.values(response)[0]);
        }
        sessionStorage.setItem('response2', data);
        this.response = JSON.parse(data);
        this.response = this.response.message.match(/\d+$/)[0];
        sessionStorage.setItem('CourseID', this.response);
        this.publishOver = true;
      },
      error: (data: any) => {
        console.log(data);
      },
      complete: () => {
        this.videoSer.addChapters(body2).subscribe({
          next: (data: any) => {
            // alert('Request Sent Succefully');
            console.log(data);
            let response = data;
            if (response[0] == '{') {
              response = JSON.parse(response);
              alert(Object.values(response)[0]);
            }
            sessionStorage.setItem('response2', data);
          },
          error: (data: any) => {
            console.log(data);
          },
        });
      },
    });
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
  preview() {
    console.log(this.videoForm.value);
  }

  uploadCheck() {
    if (
      this.videoForm.value.chapter[this.cIndex].lessonsList[this.sIndex]
        .videoLink
    )
      console.log(true);
    else console.log(false);
  }

  //edit
  addNewChapter() {
    this.addVideo = new AddVideo();
    this.chapterArray.push(this.addVideo);
  }
  addNewSub(i: any) {
    this.lessonArray = this.chapterArray[i].lessonsList;
    this.addSubchap = new addSub();
    this.lessonArray.push(this.addSubchap);
  }

  onPublish() {
    const body = {
      courseId: sessionStorage.getItem('editCourseId'),
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
      courseId: parseInt(sessionStorage.getItem('editCourseId') || '[]'),
      courseName: this.videoForm.value.videoTitle,
      chapterDataRequestList: this.chapterArray,
    };

    console.log(body, body2);
    this.videoSer.overview(body).subscribe({
      next: (data: any) => {
        alert('Overview');
        console.log(data);
        let response = data;
        if (response[0] == '{') {
          response = JSON.parse(response);
          alert(Object.values(response)[0]);
        }
        sessionStorage.setItem('response2', data);
        this.response = JSON.parse(data);
        this.response = this.response.message.match(/\d+$/)[0];
        sessionStorage.setItem('CourseID', this.response);
      },
      error: (data: any) => {
        console.log(data);
      },

      complete: () => {
        this.videoSer.addChapters(body2).subscribe({
          next: (data: any) => {
            // alert('Request Sent Succefully');
            let response = data;
            if (response[0] == '{') {
              response = JSON.parse(response);
              alert(Object.values(response)[0]);
            }
            console.log(data);
            sessionStorage.setItem('response2', data);
          },
          error: (data: any) => {
            console.log(data);
          },
          complete: () => {
            this.addNewChap = false;
          },
        });
      },
    });
  }

  removeAddChapter(i: any) {
    this.chapterArray.splice(i);
  }

  close(a: any) {
    this.cIndex = a;
    console.log(this.cIndex);
    this.status = true;

    for (let i = 0; i < this.shows.length; i++) {
      if (i == a) continue;
      else this.shows[i] = false;
    }
  }

  ccInd(a: any) {
    console.log(a);
  }

  clicked(subindex: any, cInd: any) {
    this.status = false;
    console.log(cInd + '_--------------------__' + subindex);
    this.currInd = subindex;
    this.editName = this.subChapters(cInd)
      .at(subindex)
      .get('lessonName')?.value;
    console.log(this.editName);
    this.editurl = this.subChapters(cInd).at(subindex).get('videoLink')?.value;
    console.log(this.editurl);
  }

  goBack(i: any) {
    this.status = true;
    this.addSubChapter(i);
  }
  deleteChap(a: any, l: any) {
    console.log('INDEX--' + a + '_____LENGTH--' + l);

    if (l < 2) alert('At least One Chapter is needed');
    else {
      this.chapters().removeAt(a);
    }
    this.shows.splice(a, 1);
  }

  deleteSubChap(a: any, b: any, len: any) {
    console.log('INDEX--' + a + '-' + b + '_____LENGTH--' + len);

    if (len < 2) alert('At least One SubChapter is needed');
    else {
      this.subChapters(a).removeAt(b);
      this.clicked(len - 2, a);
      this.sIndex = len - 2;
    }
  }

  storeIt(a: any) {
    console.log(a.value);
    a = JSON.stringify(a.value);
    console.log(a);
    localStorage.setItem('saves', a);
  }
  restoreSave(a: any) {
   this.videoForm.setValue({
      videoTitle: a.videoTitle,
      category: a.category,
      subCategory: a.subCategory,
      formatText: a.formatText,
      overview: a.overview,
      learning: a.learning,
      requirement: a.requirement,
      coursePhoto: a.coursePhoto,
      previewVideo: a.previewVideo,
      keyWords: a.keyWords,
      level: a.level,
      chapter: a.chapter 
    });
  }
  removeVideo(a:any,b:any){
      console.log(a+" _______ "+b);
      this.subChapters(a).at(b).get('videoLink')?.setValue(null);
      this.editurl=null;
  }
}
