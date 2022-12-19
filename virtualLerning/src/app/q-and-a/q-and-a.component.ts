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
  // public questionList: any = [];
  // qndeatails: any = [];
  shows:any=[];
  // public currentQuestion: number = 0;
  questionForm!: FormGroup;
  chapForm!: FormGroup;
  ans:any;
  correctAns:any;
  id:any;
  completeDetails:any;
  chapter:any;
  constructor(public service: QuestionService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.chapForm = this.fb.group({
      chaptername: ['', Validators.required],
      duration: ['', Validators.required],
      courseId:['',Validators.required],
      moduleTest: ['', Validators.required],
    });
    this.questionForm = this.fb.group({
      questionText: this.fb.array([
       
      ]),
    });
    // this.getAllQuestions();
    this.add();
    if(sessionStorage.getItem('addCourseDetails')){
      this.completeDetails = JSON.parse(sessionStorage.getItem('addCourseDetails') || '[]');
      console.log(this.completeDetails.chapter);
      this.chapter = this.completeDetails.chapter;
      // this.setValue();
   }
   
    
  }
  get question(): FormArray {
    return this.questionForm.controls['questionText'] as FormArray;
  }

  newQuestion(): FormGroup {
    
    return this.fb.group({
      question: ['', Validators.required],
    //  option1:this.fb.group({
    //   optn:['', Validators.required],
    //   ans: [false, Validators.required],
    //  }),
    //  option2:this.fb.group({
    //   opt:['', Validators.required],
    //   ans: [false, Validators.required]
    //  }),
    //  option3:this.fb.group({
    //   opt:['', Validators.required],
    //   ans: [false, Validators.required]
    //  }),
    //  option4:this.fb.group({
    //   opt:['', Validators.required],
    //   ans: [false, Validators.required]
    //  })
    option_1:['', Validators.required],
    option_2:['', Validators.required],
    option_3:['', Validators.required],
    option_4:['', Validators.required],
    correctAnswer:['', Validators.required],
    questionId:[],
    deleteStatus:[false]
     
    });
    
   
  }
  // getId(){
  //   if(this.chapForm.controls['chaptername'].value == 'Module Test-1'){
  //     console.log('done');
  //     this.id=37;
  //     this.getAllQuestions();
  //   }else{
  //     console.log('no')
  //   }
  // }
  add() {
    this.question.push(this.newQuestion());
   
    // console.log(this.newQuestion().controls['option1']?.value);
    console.log(this.questionForm.get('questionText')?.value);
   
    console.log(this.chapForm.value);
    // console.log(this.chapForm.controls['chaptername'].value)
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
  postQuestion(){
    let body={
      "testId":13,
      "testName":this.chapForm.controls['chaptername'].value,
      "chapterId":this.chapForm.controls['courseId'].value,
      "testDuration":this.chapForm.controls['duration'].value,
      "passingGrade":this.chapForm.controls['moduleTest'].value,
      // "questionRequests":[{
      //   "questionId":'',
      //   "questionName":"",
      //   "option_1": "a",
      //   "option_2": "b",
      //   "option_3": "c",
      //   "option_4": "d",
      //   "correctAnswer":"a",
      //   "deleteStatus":false
      // }]
      "questionRequests":this.questionForm.get('questionText')?.value
    }
    console.log(body)
    this.service.addQuestion(body).subscribe({
      next:(res)=>{
        console.log(res);
        let response =res;
        if(response[0] == '{'){
          response = JSON.parse(response);
          alert(Object.values(response)[0]);
         }
      },
      error:(error)=>{
        console.log(error.error)
      }
    })
  }
  getAllQuestions(id:any) {
    this.service.getQuestion(id)
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:(error)=>{
          console.log(error.error)
        }
      })
  }
}
