import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.css']
})
export class ProfileDialogComponent implements OnInit {
firstBlock:boolean=true;
secondBlock:boolean=false;
thirdBlock:boolean=false;
save:boolean=false;
changeForm !:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.changeForm = this.fb.group({
      oldpassword:['',Validators.required ],
      newpassword:['',Validators.required],
      confirmpassword:['',Validators.required]
    })
  }
  onedit(){
    this.firstBlock=false;
    this.secondBlock =true;
    this.thirdBlock = false;
  }
  onback(){
    this.firstBlock=true;
    this.secondBlock = false;
    this.thirdBlock = false;
  }
  onchange(){
    this.firstBlock=false;
    this.secondBlock = false;
    this.thirdBlock = true;
  }
  onSave(){
    this.save =true;
    this.onReset();
  }
  onClose(){
    this.save =false;
  }
  onclose(){
    sessionStorage.removeItem('active');
  }
  onsubmit(){
    console.log(this.changeForm);
  }
  onReset(){
    console.log(this.changeForm.value);
    this.changeForm.reset();
  }

}
