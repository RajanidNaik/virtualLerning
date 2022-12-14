import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { AdminLoginService } from '../services/admin-login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  valid = true;
  login = true;
  forgotPassword = false;
  superAdmins = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('CHANDANAKGOWDA33@GMAIL.COM', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  logindata: any;
  message:any;
  constructor(private router: Router, private al: AdminLoginService) {}

  ngOnInit(): void {
    console.log(this.loginForm);
  }
  forgot() {
    this.login = false;
    this.forgotPassword = true;
    this.superAdmins = false;
    this.message="";
  }

  superAdmin() {
    this.login = false;
    this.forgotPassword = false;
    this.superAdmins = true;
  }

  loginCheck() {
    console.log(this.loginForm.value);
    this.router.navigateByUrl('/dashboard');
    this.valid = !this.valid;

    // if(this.login) this.router.navigateByUrl('/dashboard');
    // else this.loginForm.reset();
  }

  emailCheck() {
    sessionStorage.setItem('email', this.loginForm.value.email!);
    
      const body = {
        emailId: this.loginForm.value.email,
      };
      this.al.resetPass(body).subscribe({
        next: (data) => {
          this.logindata = data;
          localStorage.setItem('save', JSON.stringify(this.logindata));
          alert(this.logindata.body.message);
          console.log('else');
        },
        error: (data) => {  
          this.message=data.error.message;
          console.log(this.message);
          
          
        }
      });
}

  adminLogin() {
    const body = {
      userName: this.loginForm.value.user,
      password: this.loginForm.value.password,
    };
    console.log(body);
    this.al.adminLogin(body).subscribe( {
      next: (data) => this.router.navigateByUrl('/dashboard'),
    error: (data) => {
      this.message =JSON.parse(data.error);
      this.message=this.message.error;
    }
    });
  }
}
