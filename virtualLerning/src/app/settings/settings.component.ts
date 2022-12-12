import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
success:boolean=false;
changeForm !:FormGroup;
pass:any;
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    localStorage.setItem('curr', JSON.stringify('Settings')); 
    localStorage.setItem('password', JSON.stringify('123456'));
    if (localStorage.getItem('password')) {
      this.pass = JSON.parse(localStorage.getItem('password') || '[]');
      console.log(this.pass)
    }
    this.changeForm = this.fb.group({
      oldpassword:['',[Validators.required,this.currentMatch()] ],
      newpassword:['',[Validators.required,Validators.minLength(6)]],
      confirmpassword:['',Validators.required]
    },{
      validators:[this.mustMatch('newpassword','confirmpassword'),this.doNotMatch('oldpassword','newpassword')]
    },
    
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
onSave(){
  this.success =true;
  this.onReset();
}
onclose(){
  this.success =false;
}
onReset(){
  console.log(this.changeForm.value);
  this.changeForm.reset();
}
}
