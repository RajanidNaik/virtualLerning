import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
import { Add } from '../add';
@Component({
  selector: 'app-q-and-a',
  templateUrl: './q-and-a.component.html',
  styleUrls: ['./q-and-a.component.css'],
})
export class QAndAComponent implements OnInit {
  plus = false;
  addQn = new Add();
  // public questionList: any = [];
  // qndeatails: any = [];
  shows: any = [];
  // public currentQuestion: number = 0;
  questionForm!: FormGroup;
  chapForm!: FormGroup;
  ans: any;
  correctAns: any;
  id: any;
  completeDetails: any;
  chapter: any;
  value: any;
  array: any = [];
  hide: any;
  testDetails: any;
  questionlist: any = [];
  questions: any;

  response: any;

  AddedChapter:any;
  chapterId:any;
  chapterName:any;

  constructor(public service: QuestionService, private fb: FormBuilder) {}

  ngOnInit(): void {

     this.response = sessionStorage.getItem('CourseID') || 27;
     this.getChapterList();

    this.chapForm = this.fb.group({
      chaptername: ['', Validators.required],
      duration: ['', Validators.required],
      courseId: ['', Validators.required],
      moduleTest: ['', Validators.required],
      passingGrade: ['', Validators.required],
    });
    this.questionForm = this.fb.group({
      questionText: this.fb.array([]),
    });
    this.add();
    if (sessionStorage.getItem('addCourseDetails')) {
      this.hide = true;
      this.completeDetails = JSON.parse(
        sessionStorage.getItem('addCourseDetails') || '[]'
      );
      console.log(this.completeDetails.chapter);
      this.chapter = this.completeDetails.chapter;
      this.array = this.chapter;
    } else {
      this.hide = false;
    }
  }
  get question(): FormArray {
    return this.questionForm.controls['questionText'] as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      option_1: ['', Validators.required],
      option_2: ['', Validators.required],
      option_3: ['', Validators.required],
      option_4: ['', Validators.required],
      correctAnswer: ['', Validators.required],
      questionId: ['',Validators.required],
      deleteStatus: ['',Validators.required],
    });
  }

  add() {
    this.question.push(this.newQuestion());
  }

  deleteOption(lessonIndex: number) {
    this.question.removeAt(lessonIndex);
  }
  show(i: any) {
    this.shows[i] = !this.shows[i];
  }
  postQuestion() {
    let body = {
      testId: 13,
      testName: this.chapForm.controls['moduleTest'].value,
      chapterId: this.chapForm.controls['courseId'].value,
      testDuration: this.chapForm.controls['duration'].value,
      passingGrade: this.chapForm.controls['passingGrade'].value,
      questionRequests: this.questionForm.get('questionText')?.value,
    };
    console.log(body);
    this.service.addQuestion(body).subscribe({
      next: (res) => {
        console.log(res);
        let response = res;
        sessionStorage.setItem('qAnda','true');
        if (response[0] == '{') {
          response = JSON.parse(response);
          alert(Object.values(response)[0]);
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
  getAllQuestions(e: any) {
    this.value = e.target.value;
    this.array = this.chapter.filter((item: any) => {
      return item.chapterName == this.value;
    });
    // console.log(this.array[0].chapterId);
    this.id = this.array[0].chapterId;
    this.service.getQuestion(this.array[0].chapterId).subscribe({
      next: (res) => {
        console.log(res);
        this.testDetails = res;
        this.questionlist = this.testDetails.questionRequests;
      },
      error: (error) => {
        console.log(error.error.message);
      },
      complete: () => {
        this.setValue();
      },
    });
  }

  setValue() {
    this.chapForm.patchValue({
      duration: this.testDetails.testDuration,
      moduleTest: this.testDetails.testName,
      courseId: this.testDetails.chapterId,
      passingGrade: this.testDetails.passingGrade,
    });
  }
  newQn() {
    this.addQn = new Add();
    this.questionlist.push(this.addQn);
  }
  deleteQuestion(i:any){
    this.questionlist.splice(i);
  }
  onPost() {
    let body = {
      testId: 13,
      testName: this.chapForm.controls['moduleTest'].value,
      chapterId: this.chapForm.controls['courseId'].value,
      testDuration: this.chapForm.controls['duration'].value,
      passingGrade: this.chapForm.controls['passingGrade'].value,
      questionRequests: this.questionlist,
    };
    console.log(body);
    this.service.addQuestion(body).subscribe({
      next: (res) => {
        console.log(res);
        sessionStorage.setItem('qAnda', 'true');
        let response = res;
        if (response[0] == '{') {
          response = JSON.parse(response);
          alert(Object.values(response)[0]);
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  getChapterList(){
    this.service.getChapter(this.response).subscribe({
      next:(res)=>{
        console.log(res);
        this.AddedChapter =res;
      },
      error:(error)=>{
        console.log(error.error.message);
      }
    })
  }
  getChapterId(e: any) {
    this.chapterName = e.target.value;
    this.array = this.AddedChapter.filter((item: any) => {
      return item.chapterName == this.chapterName;
    });
    console.log(this.array[0].chapterId);
    this.chapterId = this.array[0].chapterId;
    this.chapForm.patchValue({
      courseId:this.chapterId
    })
  }
}
