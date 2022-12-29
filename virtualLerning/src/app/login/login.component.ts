import { LocationStrategy } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
  item: any;
  forgotPassword = false;
  superAdmins = false;
  hide = true;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  emailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  logindata: any;
  message: any;

  constructor(
    private router: Router,
    private al: AdminLoginService,
    private location: LocationStrategy
  ) {
    history.pushState(null, 'null', window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, 'null', window.location.href);
    });
  }

  ngOnInit(): void {
    console.log(this.loginForm);
  }
  forgot() {
    this.login = false;
    this.forgotPassword = true;
    this.superAdmins = false;
    this.message = '';
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
    sessionStorage.setItem('email', this.emailForm.value.email!);
    this.message = '';
    const body = {
      emailId: this.emailForm.value.email,
    };
    this.al.resetPass(body).subscribe({
      next: (data) => {
        this.logindata = data;
        console.log(data);
        alert(this.logindata.body.message);
        console.log('else');
        this.router.navigateByUrl('/otp');
      },
      error: (data) => {
        this.message = data.error.message;
        console.log(this.message);
      },
    });
  }
  // const keys = response.headers.keys();
  //   const headers = keys.map(key =>
  //     `${key}: ${response.headers.get(key)}`);

  //    console.table(headers);

  adminLogin() {
    this.message = '';
    const body = {
      userName: this.loginForm.value.user,
      password: this.loginForm.value.password,
    };
    console.log(body);
    this.al.adminLogin(body).subscribe({
      next: (data) => {
        let token: any = data.headers.get('jwt-token');

        sessionStorage.setItem('token', token);
        sessionStorage.setItem('saveStatus', 'new');
        sessionStorage.setItem('count', '1');
        this.router.navigateByUrl('/dashboard');
        // console.log(data);
      },
      error: (data) => {
        this.message = 'Invalid Credential';
      },
    });
  }

  supAdminLogin() {
    this.message = '';
    const body = {
      userName: this.loginForm.value.user,
      password: this.loginForm.value.password,
    };
    console.log(body);
    this.al.adminLogin(body).subscribe({
      next: (data) => {
        let token: any = data.headers.get('jwt-token');
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', 'sup');
        this.item = data.body;
        console.log(typeof this.item.role);

        if (this.item.role == '[ROLE_SUPER_ADMIN]') {
          this.router.navigateByUrl('/super');
        } else {
          alert('Not a Super Admin ');
          this.superAdmins = false;
          this.login = true;
        }
      },
      error: (data) => {
        console.log(data);
        alert('Not A Super Admin');
        this.superAdmins = false;
        this.login = true;
      },
    });
  }
  @HostListener('document:keydown.enter') keydata() {
    if (this.superAdmins == true && this.login == false) {
      this.supAdminLogin();
    } else {
      this.adminLogin();
    }
  }
}
