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
  // public Editor = ClassicEditor;
  constructor(public fb: FormBuilder) {}
  category:Array<string>=["Design","Development","Business","Music","Finance","Health","IT","Marketting","LifeStyle","Photogrphy"];

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

  show(i:any) {
 this.count=0;
 if(this.videoForm.controls['chapter'].touched){
  if(this.count == i){
    this.plus = !this.plus;
    console.log(this.count)
  }else{
    this.plus=false
  }
 }
   
  
  console.log(i);
  
      //this.plus = !this.plus;
    
    
  }
  add() {

    // this.array.push("v");
    //   const control =new FormControl('', Validators.required);
    //   (<FormArray>this.videoForm.get('chapter')).push(control);
    //   console.log(this.videoForm.value);
      
      let lan = new FormGroup({
        chaptername:new FormControl(''),
        sub: new FormControl('')
      });
      (<FormArray>this.videoForm.controls['chapter']).push(lan);
      console.log(this.videoForm.value);
      console.log(this.videoForm.value);
  }
  get getControl(){
    return (<FormArray>this.videoForm.controls['chapter']).controls;
    
  }
  publish(){
     console.log(this.videoForm.value);
  }
}
