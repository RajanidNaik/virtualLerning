import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    user: new FormControl('Name', [Validators.required]),
    password: new FormControl('123456789', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('abc@gmail.com', [Validators.email]),
  });
  constructor(private router: Router) {}

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
    console.log('sdfs');

    this.router.navigateByUrl('/otp');
  }
}
