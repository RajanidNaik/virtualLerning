import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { QuestionService } from '../question.service';
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
savePro:boolean=false;
changeForm !:FormGroup;
chageProfile !: FormGroup;
pass:any;
trans:boolean=false;
profileDetails:any;
name:any;
email:any;
number:any;
photo:any;
editPhoto:any;
imageFile:any;
result:any;
response:any;
  constructor(private fb:FormBuilder,public service:QuestionService) { }

  ngOnInit(): void {
    this.getPro();
    
    this.chageProfile = this.fb.group({
      name:['',[Validators.required,Validators.pattern("^[a-zA-Z][a-zA-Z ]{2,}")]],
      email:['',Validators.required],
      mobileNumber:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      profile:['',Validators.required]
    })
   
    if(sessionStorage.getItem('trans')){
      this.trans = true;
     
    }
   
    if (localStorage.getItem('password')) {
      this.pass = JSON.parse(localStorage.getItem('password') || '[]');
      console.log(this.pass)
    }
    this.changeForm = this.fb.group({
      // oldpassword:['',[Validators.required,this.currentMatch()] ],
      oldpassword:['',[Validators.required] ],
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
  // currentMatch(){
  //   return(control:FormGroup)=>{
  //     if(control.value !== this.pass){
  //       return ({currentMatch:true}) 
  //     }
  //     else{
  //       return
  //     }
  //   }
  // }
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
    console.log(this.changeForm.value)
    this.changepass();
    this.onReset();
  }
  onClose(){
    this.save =false;
    this.savePro =false;
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
proSave(){
  console.log(this.chageProfile.value);
  this.savePro =true;
  this.updateProfile()
}
  // sub(){
  //   this.trans =true;
  // }

getPro(){
  this.service.getProfile().subscribe({
    next:(res)=>{
      console.log(res);
      this.profileDetails = res;
      // this.name = this.profileDetails.fullName;
      // this.email = this.profileDetails.emailId;
      // this.number = this.profileDetails.mobileNumber;
      this.photo = this.profileDetails.profilePhoto;
      
    },
    error:(error)=>{
      alert(error.error.message);
    },
  complete:()=>{
    this.setValue();
  }

  })
}

onFileSelect(event:any){
  if (event.target.files.length > 0){
    this.imageFile =event.target.files[0];
  console.log(event.target.files[0]);
  this.photo = this.imageFile;
  }
  else{
    this.photo = this.profileDetails.profilePhoto;
  }
}
setValue(){
  this.chageProfile.patchValue({
    name:this.profileDetails.fullName,
    email:this.profileDetails.emailId,
    mobileNumber:this.profileDetails.mobileNumber,
    profile:this.profileDetails.profilePhoto
  })
}
updateProfile(){
  
  let data :any= {
    'profilePhoto':this.imageFile,
    'fullName':this.chageProfile.get('name')?.value,
    'mobileNumber':this.chageProfile.get('mobileNumber')?.value
  }
 console.log(data)
  
  this.service.updateProfile(data).subscribe({
    next:(res)=>{
      console.log(res);
      this.result = res;
      console.log(this.result.message)
    },
    error:(error)=>{
      alert(error.error);
    },
    complete:()=>{
      this.getPro();
    }
  })
}

changepass(){
  let body ={
    "oldPassword":this.changeForm.get('oldpassword')?.value,
    "newPassword":this.changeForm.get('newpassword')?.value
  }
  this.service.changePassword(body).subscribe({
    next:(res)=>{
      console.log(res);
      this.response =res;
      
      // if(this.response[0] == '{'){
      //   this.response = JSON.parse(this.response);
      //   alert(Object.values(this.response)[0]);
      //  }
    }
  })
}

}
