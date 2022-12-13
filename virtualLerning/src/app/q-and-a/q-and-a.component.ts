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
  constructor(public service: QuestionService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chapForm = this.fb.group({
      chaptername: ['', Validators.required],
      duration: ['', Validators.required],
      moduleTest: ['', Validators.required],
    });
    this.questionForm = this.fb.group({
      questionText: this.fb.array([]),
    });
    // this.getAllQuestions();
    this.add();
  }
  get question() {
    return this.questionForm.controls['questionText'] as FormArray;
  }
  add() {
    this.shows?.push(false);
    console.log(this.questionForm.value);
    console.log(this.chapForm.value);
    const optionForm = this.fb.group({
      question: ['', Validators.required],
      opt1: ['', Validators.required],
      opt2: ['', Validators.required],
      opt3: ['', Validators.required],
      opt4: ['', Validators.required],
      true1: [false, Validators.required],
      true2: [false, Validators.required],
      true3: [false, Validators.required],
      true4: [false, Validators.required],
    });
    this.question.push(optionForm);
    console.log(this.shows);
    
    
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
