import { Injectable } from '@angular/core';
import {  CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogInserService } from './log-inser.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(){
    if (sessionStorage.getItem('token')) {
      if(sessionStorage.getItem('role')=='sup') this.router.navigateByUrl('/super');
      else this.router.navigateByUrl('/dashboard')
      return true;
    }
      else return true;
    }
  
}
