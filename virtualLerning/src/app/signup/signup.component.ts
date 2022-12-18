import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminLoginService } from '../services/admin-login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  url: any;
  selectedFile: any;
  imageAvail = false;
  constructor(private al: AdminLoginService, private router: Router) {}
  signUpForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mob: new FormControl('', [Validators.required, Validators.minLength(10)]),
    textArea: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    designation: new FormControl('', [Validators.required]),
    urlLink: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}
  checkNum(event: any) {
    const char = event.which ? event.which : event.keycode;
    if (char > 31 && (char < 48 || char > 57)) return false;
    else return true;
  }
  onSelectDp(event: any) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }
  request() {
    let num ="+91"+this.signUpForm.value.mob
    const body = {
      emailId: this.signUpForm.value.email,
      fullName: this.signUpForm.value.userName,
      mobileNumber: num,
      designation: this.signUpForm.value.designation,
      description: this.signUpForm.value.textArea,
      url: this.signUpForm.value.urlLink,
    };
    console.log(body);
    this.al.signUp(body).subscribe({
      next: (data) => {
        alert('Request Sent Succefully');
        console.log(data);
        // this.router.navigateByUrl('/');
      },
      error: (data) => {
        console.log(data);
      },
    });
  }
}
