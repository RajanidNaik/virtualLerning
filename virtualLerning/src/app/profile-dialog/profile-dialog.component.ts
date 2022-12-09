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
pass:any;
trans:boolean=false;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    
    if(sessionStorage.getItem('trans')){
      this.trans = true;
     
    }
   
    if (localStorage.getItem('password')) {
      this.pass = JSON.parse(localStorage.getItem('password') || '[]');
      console.log(this.pass)
    }
    this.changeForm = this.fb.group({
      oldpassword:['',[Validators.required,this.currentMatch()] ],
      newpassword:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required]
    },
    {
      validators:[this.mustMatch('newpassword','confirmpassword'),this.doNotMatch('oldpassword','newpassword')]
    }
    )
  }
  mustMatch(password:string,confirm:string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[password];
      const matchControl = formGroup.controls[confirm];
      if(matchControl.errors && !matchControl.errors['mustMatch']){
        return
      }
      if(control.value !== matchControl.value){
           matchControl.setErrors({mustMatch:true})
      }
      else{
        matchControl.setErrors(null)
      }
    }

  }
  currentMatch(){
    return(control:FormGroup)=>{
      if(control.value !== this.pass){
        return ({currentMatch:true}) 
      }
      else{
        return
      }
    }
  }
  doNotMatch(oldpass:string, newpass:string){
    return(control:FormGroup)=>{
      const controlOld = control.controls[oldpass];
      const controlNew = control.controls[newpass];
      if(controlNew.errors && !controlNew.errors['doNotMatch']){
        return
      }
      if(controlOld.value == controlNew.value){
           controlNew.setErrors({doNotMatch:true})
      }
      else{
        controlNew.setErrors(null)
      }
    }

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
    sessionStorage.removeItem('trans');
  }
  onsubmit(){
    console.log(this.changeForm);
  }
  onReset(){
    console.log(this.changeForm.value);
    this.changeForm.reset();
  }

  // sub(){
  //   this.trans =true;
  // }
}
