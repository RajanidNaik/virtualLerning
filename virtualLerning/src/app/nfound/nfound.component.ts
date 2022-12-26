import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-nfound',
  templateUrl: './nfound.component.html',
  styleUrls: ['./nfound.component.css'],
})
export class NFoundComponent implements OnInit {
  constructor(private router: Router){
  }

  ngOnInit(): void {}
  logout() {
    this.router.navigateByUrl('/login');
    sessionStorage.clear();
    localStorage.clear();
  }
}
