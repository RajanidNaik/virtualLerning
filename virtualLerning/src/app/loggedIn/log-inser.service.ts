import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogInserService {
  constructor() {}

  loggedIn() {
    if (sessionStorage.getItem('token')) return true;
    else return false;
  }
}
