import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-q-and-a',
  templateUrl: './q-and-a.component.html',
  styleUrls: ['./q-and-a.component.css'],
})
export class QAndAComponent implements OnInit {
  plus = false;
  public questionList: any = [];
  qndeatails: any = [];
  shows:any=[];
  public currentQuestion: number = 0;
  questionForm!: FormGroup;
  chapForm!: FormGroup;
  ans:any;
  constructor(public service: QuestionService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chapForm = this.fb.group({
      chaptername: ['', Validators.required],
      duration: ['', Validators.required],
      moduleTest: ['', Validators.required],
    });
    this.questionForm = this.fb.group({
      questionText: this.fb.array([
        
      ]),
    });
    // this.getAllQuestions();
    this.add();
    
  }
  get question(): FormArray {
    return this.questionForm.controls['questionText'] as FormArray;
  }

  newQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
     option1:this.fb.group({
      opt:['', Validators.required],
      ans: [false, Validators.required]
     }),
     option2:this.fb.group({
      opt:['', Validators.required],
      ans: [false, Validators.required]
     }),
     option3:this.fb.group({
      opt:['', Validators.required],
      ans: [false, Validators.required]
     }),
     option4:this.fb.group({
      opt:['', Validators.required],
      ans: [false, Validators.required]
     })
    });
  }
  add() {

    this.question.push(this.newQuestion());
    console.log(this.questionForm.value);
    console.log(this.chapForm.value);
    // sessionStorage.setItem('ans',JSON.stringify(this.questionForm.value));
    // if(sessionStorage.getItem('ans')){
    //   this.ans = sessionStorage.getItem('ans');
    //   this.ans = JSON.parse(this.ans);
    //   console.log(this.ans.questionText);
    //       }
  }

  deleteOption(lessonIndex: number) {
    this.question.removeAt(lessonIndex);
  }
  show(i: any) {
    this.shows[i] = !this.shows[i];
  }
  // getAllQuestions() {
  //   this.service.getQuestionJson()
  //     .subscribe(res => {
  //       this.questionList = res.questions;
  //       console.log(this.questionList);
  //     })
  // }
}
