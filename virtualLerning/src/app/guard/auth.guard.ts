import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as e from 'express';
import { AuthService } from '../auth ser/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ser:AuthService){}
  canActivate(){
    if(this.ser.loggedIn()) return true;
    else return false;
  }
  
}
