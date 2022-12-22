import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn(){
    if(sessionStorage.getItem('token')) return true;
    else return false;  
  }
}
