import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}
  signUpForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    mob: new FormControl('', [Validators.required, Validators.minLength(10)]),
    textArea: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
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

  request() {
    console.log(this.signUpForm.value);
    alert('Request Sent Succefully');
  }
}