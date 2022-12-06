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
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.changeForm = this.fb.group({
      oldpassword:['',Validators.required ],
      newpassword:['',Validators.required],
      confirmpassword:['',Validators.required]
    })
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
