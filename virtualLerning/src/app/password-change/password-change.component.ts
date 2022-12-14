import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AdminLoginService } from '../services/admin-login.service';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  mismatch = false;
  passwordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPasssword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  email: any;
  constructor(private router: Router, private al: AdminLoginService) {}

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email');
    console.log(this.email);
  }
  change() {
    console.log(this.passwordForm.value.password);
    if (
      this.passwordForm.value.confirmPasssword ===
      this.passwordForm.value.password
    ) {
      this.mismatch = false;
      const body = {
        emailId: this.email,
        password: this.passwordForm.value.password,
      };
      console.log(body);
      
      this.al.reset(body).subscribe({
        next: (data: any) => {
          alert('PasswordChange');
          console.log(data);
          // this.router.navigateByUrl('/');
        },
        error: (data: any) => {
          console.log(data);
          this.passwordForm.reset();
        },
      });
    } else this.mismatch = true;
  }
}
