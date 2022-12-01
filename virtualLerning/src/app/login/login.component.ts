import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login = true;
  forgotPassword = false;
  constructor() { }

  ngOnInit(): void {
  }
  forgot(){
    this.login = false;
    this.forgotPassword = true;
  }

}
