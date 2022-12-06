import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  mismatch=false;
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
  constructor(private router: Router) {}

  ngOnInit(): void {}
  change() {
    console.log(this.passwordForm.value.confirmPasssword);
    if( this.passwordForm.value.confirmPasssword=== this.passwordForm.value.password) {
      this.mismatch = !this.mismatch;  
      alert("Succefully change");
        
        this.router.navigateByUrl('/')
    }
    else if(this.mismatch == false) this.mismatch=!this.mismatch;
      
  }
}
