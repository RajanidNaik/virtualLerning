import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AdminLoginService } from '../services/admin-login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  logindata: any;
  message="";
  constructor(private router: Router, private al: AdminLoginService) {}
  login!: FormGroup;
  otp: any;
  email: any;
  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
    this.login = new FormGroup({
      val1: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      val2: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      val3: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      val4: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });
  }

  resend() {
    console.log(this.login.value);
    const body = {
      emailId: this.email,
    };
    console.log(body);
     this.al.resend(body).subscribe({
       next: (data) => {
        alert("OTP send")
         this.logindata = data;
         console.log(data);;
       },
       error: (data) => {
         console.log(data);;
       },
     });
  }
  jump(e: any, first: any, mid: any, last: any) {
    var length = mid.value.length;
    var maxlength = mid.getAttribute('maxlength');
    if (length == maxlength) {
      if (last != ' ') {
        last.focus();
      }
    }
    if (e.key === 'Backspace') {
      first.focus();
    }
  }
  checkNum(event: any) {
    const char = event.which ? event.which : event.keycode;
    if (char > 31 && (char < 48 || char > 57)) return false;
    else return true;
  }
  verify() {
    this.otp =
      this.login.value.val1 +
      this.login.value.val2 +
      this.login.value.val3 +
      this.login.value.val4;
    // console.log(this.otp);
    const body = {
      emailId: this.email,
      otp: this.otp,
    };
    console.log(body);
      this.al.otp(body).subscribe({
        next: (data) => {
          this.logindata = data;
          console.log(data);
          this.router.navigateByUrl('/password');
        },
        error: (data) => {
                this.message = "Invalid OTP";
                console.log(data);
                
        },
      });
}
}