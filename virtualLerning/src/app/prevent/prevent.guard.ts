import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class PreventGuard implements CanDeactivate<LoginComponent> {
 
  canDeactivate(){
    if (sessionStorage.getItem('token')) return true;
    else return true;
  }
  
}
