import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  plus = false;
  array=["v"]
  videoForm!:FormGroup;
  skills = new FormArray([]);
  count:any;
  info:any;
  // public Editor = ClassicEditor;
  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    // this.videoForm = this.fb.group({
    //   videoTitle: new FormControl(''),
    //   category: new FormControl(''),
    //   chapter: this.fb.array([
    //   ]),
    // });
    this.videoForm = new FormGroup({
      videoTitle: new FormControl(''),
      category: new FormControl(''),
      chapter: this.fb.array([ ]),
    });
    this.add() ;
    
  }
  data(i:any){
    sessionStorage.setItem('plus',JSON.stringify(i));
    this.count =i;
    if(sessionStorage.getItem('plus')){
      this.info =JSON.parse(sessionStorage.getItem('plus') || '[]');
      console.log(this.info);
     }
     
  }

  show(id:any) {
    console.log(id)
   
      if(this.info === id ){
              this.plus = !this.plus;
            }
    else{
      this.plus =false
    }
      
   

  }
  add() {
    // this.array.push("v");
    //   const control =new FormControl('', Validators.required);
    //   (<FormArray>this.videoForm.get('chapter')).push(control);
    //   console.log(this.videoForm.value);
      sessionStorage.removeItem('plus')
      let lan = new FormGroup({
        chaptername:new FormControl(''),
        sub: new FormControl('')
      });
      (<FormArray>this.videoForm.controls['chapter']).push(lan);
      // this.videoForm.reset();
  }
  get getControl(){
    return (<FormArray>this.videoForm.controls['chapter']).controls;
    
  }
}
