import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  constructor(private router:Router) { }
  val1:any
  val2:any;
  val3:any;
  val4:any;
  otp:any
  ngOnInit(): void {
  }
   
resend(){
  console.log(typeof this.val1);
  
}
jump(e:any ,first:any,mid:any,last:any){
 var length = mid.value.length;
 var maxlength = mid.getAttribute('maxlength');
 if(length == maxlength){
  if( last !=" "){
  last.focus();
  }
 } 
 if(e.key === "Backspace"){
  first.focus();
 }
}
checkNum(event:any){
  const char= (event.which)?event.which: event.keycode;
  if(char > 31 && (char < 48 || char >57)) return false;
  else return true;
}
verify(){
  this.otp = this.val1+this.val2+this.val3+this.val4;
  console.log("OTP"+this.otp);
  this.router.navigateByUrl('/password');
}


}


