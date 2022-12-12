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
@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  plus = false;
  isChecked: any;
  array = ['v'];
  selected: any;
  videoForm!: FormGroup;
  skills = new FormArray([]);

  count: any;
  public Editor = ClassicEditor;
  constructor(public fb: FormBuilder, private dialog: MatDialog) {}
  category:any;

  count:any;
  info:any;


  ngOnInit(): void {
    this.category=localStorage.getItem('category');
    this.category=JSON.parse(this.category);
    this.videoForm = new FormGroup({
      videoTitle: new FormControl(''),
      category: new FormControl(''),
      overview: new FormControl(''),
      duration: new FormControl(''),
      certifcate: new FormControl(''),
      learning: this.fb.array([this.fb.control('')]),
      requirement: this.fb.array([this.fb.control('')]),

      chapter: this.fb.array([]),
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

  get getControl() {
    return (<FormArray>this.videoForm.controls['chapter']).controls;
  }
  get requirement() {
    return this.videoForm.get('requirement') as FormArray;
  }
  get learning() {
    return this.videoForm.get('learning') as FormArray;
  }

  addReq() {
    let lan = new FormControl('');
    (<FormArray>this.videoForm.controls['requirement']).push(lan);
  }

  addLear() {
    let lan = new FormControl('');
    (<FormArray>this.videoForm.controls['learning']).push(lan);
  }

  publish() {
    console.log(this.videoForm.value);
  }

  uploadVideo(event: any) {
    this.selected = event.target.files[0];
    console.log(this.selected);
  }

  checkBox(event: any) {
    console.log(event.checked);
    console.log(event.checked);
  }

  addCategory() {
    this.dialog.open(DialogCategoryComponent);
  }
}
