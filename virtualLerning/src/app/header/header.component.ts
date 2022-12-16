import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog:MatDialog,private router:Router) { }
  head:any;
  ngOnInit(): void {
    this.head = localStorage.getItem('curr');
    this.head = JSON.parse(this.head);

  }
  openDialogProfile(){
    sessionStorage.setItem('active',JSON.stringify('yes'));
      sessionStorage.setItem('trans',JSON.stringify(true))
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height='100%';
    dialogConfig.width='0%';
    dialogConfig.panelClass = 'trans',
   
    dialogConfig.position ={
      right:'0%',
     
    }
    
    this.dialog.open(ProfileDialogComponent,dialogConfig)   
  }
  logout(){
    this.router.navigateByUrl('/');
    sessionStorage.removeItem('token');
  }
}
