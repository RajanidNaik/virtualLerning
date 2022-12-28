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
  questionlist: any [] = [];
  questions: any;

  response: any;

  AddedChapter:any;
  chapterId:any;
  chapterName:any;
  correct:boolean=false;
 

  constructor(public service: QuestionService, private fb: FormBuilder) {}

  ngOnInit(): void {

     this.response = sessionStorage.getItem('CourseID') ;
     if(sessionStorage.getItem('CourseID')){
      this.getChapterList();
     }
     

    this.chapForm = this.fb.group({
      chaptername: ['', Validators.required],
      duration: ['', [Validators.required,Validators.pattern('([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]')]],
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
      questionId: ['' ,Validators.required],
      deleteStatus: [false],
    },
    {
      validators:[this.mustMatchs('option_1','option_2','option_3','option_4','correctAnswer'),this.doNotMatchOption1('option_2','option_3','option_4','option_1'),this.doNotMatchOption2('option_1','option_3','option_4','option_2'),this.doNotMatchOption3('option_1','option_2','option_4','option_3'),
      this.doNotMatchOption4('option_1','option_2','option_3','option_4')
    ]
    });
  }
  mustMatchs(opt1:string,opt2:string,opt3:string,opt4:string,ans:string,){
    return(formGroup:FormGroup)=>{
      const control1 = formGroup.controls[opt1];
      const control2 = formGroup.controls[opt2];
      const control3 = formGroup.controls[opt3];
      const control4 = formGroup.controls[opt4];
      const matchControl = formGroup.controls[ans];
      if(matchControl.errors && !matchControl.errors['mustMatchs']){
        return
      }
      if((control1.value != matchControl.value) && (control2.value != matchControl.value)&& (control3.value != matchControl.value)&& (control4.value != matchControl.value)){
           matchControl.setErrors({mustMatchs:true})
      } 
      else{
        matchControl.setErrors(null)
      }
    }
  }
  doNotMatchOption1(opt2:string,opt3:string,opt4:string,opt1:string){
    return(formGroup:FormGroup)=>{
      const control2 = formGroup.controls[opt2];
      const control3 = formGroup.controls[opt3];
      const control4 = formGroup.controls[opt4];
      const matchControl = formGroup.controls[opt1];
      if(matchControl.errors && !matchControl.errors['doNotMatchOption1']){
        return
      }
      if( ( (control2.value  == matchControl.value) || (control3.value  == matchControl.value) || (control4.value == matchControl.value) )){
           matchControl.setErrors({doNotMatchOption1:true})
      }
      else{
        matchControl.setErrors(null)
      }
    }

  }
  doNotMatchOption2(opt1:string,opt3:string,opt4:string,opt2:string){
    return(formGroup:FormGroup)=>{
      const control2 = formGroup.controls[opt1];
      const control3 = formGroup.controls[opt3];
      const control4 = formGroup.controls[opt4];
      const matchControl = formGroup.controls[opt2];
      if(matchControl.errors && !matchControl.errors['doNotMatchOption2']){
        return
      }
      if( ( (control2.value == matchControl.value) || (control3.value == matchControl.value) || (control4.value == matchControl.value) )){
           matchControl.setErrors({doNotMatchOption2:true})
      }
      else{
        matchControl.setErrors(null)
      }
    }

  }
  doNotMatchOption3(opt1:string,opt2:string,opt4:string,opt3:string){
    return(formGroup:FormGroup)=>{
      const control2 = formGroup.controls[opt1];
      const control3 = formGroup.controls[opt2];
      const control4 = formGroup.controls[opt4];
      const matchControl = formGroup.controls[opt3];
      if(matchControl.errors && !matchControl.errors['doNotMatchOption3']){
        return
      }
      if( ( (control2.value == matchControl.value) || (control3.value == matchControl.value) || (control4.value == matchControl.value) )){
           matchControl.setErrors({doNotMatchOption3:true})
      }
      else{
        matchControl.setErrors(null)
      }
    }

  }
  doNotMatchOption4(opt1:string,opt2:string,opt3:string,opt4:string){
    return(formGroup:FormGroup)=>{
      const control2 = formGroup.controls[opt1];
      const control3 = formGroup.controls[opt2];
      const control4 = formGroup.controls[opt3];
      const matchControl = formGroup.controls[opt4];
      if(matchControl.errors && !matchControl.errors['doNotMatchOption4']){
        return
      }
      if( ( (control2.value == matchControl.value) || (control3.value == matchControl.value) || (control4.value == matchControl.value) )){
           matchControl.setErrors({doNotMatchOption4:true})
      }
      else{
        matchControl.setErrors(null)
      }
    }

  }

showAns(){
  console.log(this.questionForm.controls['questionText'].get('option_1')?.value)
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
        console.log(res.message);
        this.testDetails = res;
        if(res.message == 'null'){
          this.questionlist = [];
        }else{
          this.questionlist = this.testDetails.questionRequests;
        }
       
      
        console.log(this.questionlist)
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
    console.log(this.questionlist);
    console.log(this.addQn)
    this.addQn = new Add();
    this.questionlist.push(this.addQn);
  }
  deleteQuestion(i:any){
    // if(this.questionlist.length >1){
    //   this.questionlist.splice(i);
    // }
    this.questionlist.splice(i);
    this.questionlist[i].deleteStatus == true;
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
        alert(error.error.message);
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
        alert(error.error.message);
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
