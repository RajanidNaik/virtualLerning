import { Component, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { QuestionService } from '../question.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileDetails: any;

  constructor(private dialog:MatDialog,private router:Router, public service:QuestionService) { }
  head:any;
  show=false;
  id:any;
  qa:any;
  hide:boolean=false;
  photo:any ="/assets/mg 1.png";
  name:any="jeelan";
  

  ngOnInit(): void {
    this.head = localStorage.getItem('curr');
    this.head = JSON.parse(this.head);
    if (this.head == "Add Courses") this.show=true;
    
    this.qa = sessionStorage.getItem('qAnda');

     this.getPro();
     this.getId();
  }


  getId(){
    if(sessionStorage.getItem('CourseID')){
      this.hide =true;
      this.id = sessionStorage.getItem('CourseID');
     }; 

  }
  openDialogProfile(){
    sessionStorage.setItem('active',JSON.stringify('yes'));
   sessionStorage.setItem('trans',JSON.stringify(true));
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
    sessionStorage.clear();
    localStorage.clear();

  }
  getPro(){
    this.service.getProfile().subscribe({
      next:(res)=>{
        console.log(res);
        this.profileDetails = res;
        console.log(this.profileDetails);
       
      },
      error:(error)=>{
        alert(error.error.message);
      },
      complete:()=>{
        this.photo =this.profileDetails.profilePhoto;
        this.name = this.profileDetails.fullName
      }
    })
  }

  publish(){
    if(sessionStorage.getItem('CourseID')){
      console.log("Publish");
      this.service.publish(this.id).subscribe({
        next:(res)=>{
          console.log(res);
          let response = res;
          alert(response.message);
          sessionStorage.removeItem('addCourseDetails');
           localStorage.removeItem('saves');
           sessionStorage.setItem('saveStatus','new');
        // if (response == '{') {
        //   response = JSON.parse(response);
        //   alert(Object.values(response));
        // }
        },
        error:(error)=>{
          alert(error.error.message);
        },
        complete:()=>{
          sessionStorage.removeItem('addCourseDetails');
        }
      });
    }
    
    
  }
}
