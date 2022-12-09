import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormArray,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  loginForm = new FormGroup({
    user: new FormControl('admin', [Validators.required]),
    password: new FormControl('admin@123', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  constructor(private router: Router, private al:AdminLoginService){}

  ngOnInit(): void {}
  forgot() {
    this.login = false;
    this.forgotPassword = true;
  }
  loginCheck() {
    console.log(this.loginForm.value);
    this.router.navigateByUrl('/dashboard');
    this.valid = !this.valid;

    // if(this.login) this.router.navigateByUrl('/dashboard');
    // else this.loginForm.reset();
  }

  emailCheck() {
    console.log(this.loginForm.value);

    // this.router.navigateByUrl('/otp');
  }

  adminLogin(){

    const body = {
      "userName" : this.loginForm.value.user,
      "password" : this.loginForm.value.password
    }

    console.log(body);
    this.al.adminLogin(body).subscribe(data => {
      console.log(data);
      
    })
  }
}
