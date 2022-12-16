import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { SuperAdminServiceService } from '../superAdminService/super-admin-service.service';

@Component({
  selector: 'app-super-admindashboard',
  templateUrl: './super-admindashboard.component.html',
  styleUrls: ['./super-admindashboard.component.css']
})
export class SuperAdmindashboardComponent implements OnInit {
  adminData: any;
  request: any;
  array:any=[];
  rejectedList: any;
  constructor(private supS:SuperAdminServiceService) { }

  ngOnInit(): void {
    let temp:any;
     this.supS.getDash().subscribe({
       next: (data) => {
         this.adminData = data;
         console.log(this.adminData);
          this.request = this.adminData.listOfAdmins;
          for (let i of this.request) {
            this.array.push(false);
          }
       },
       error: (data) => console.log(data),
     });
     this.rejectList();
    
  }

  accept(item:any,index:any){
    const body = {
      emailId: item.emailId,
      fullName: item.fullName,
    };
    this.supS.adminAccept(body).subscribe(data => console.log(data)
    );
    this.remove(index);
    this.adminData.totalNumberOfAdmins++;
  }

  reject(item:any,index:any){
     const body = {
       emailId: item.emailId,
     }
     this.supS.adminReject(body).subscribe(data => console.log(data)
);
    this.remove(index)
  }

  toggle(i:any){
    this.array[i]=!this.array[i];
  }

  remove(i:any){
      this.request.splice(i,1)

  }
  rejectList(){
    this.supS.removed().subscribe((data) => {
      this.rejectedList=data;
      console.log(this.rejectedList);
    });
  }
}
