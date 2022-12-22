import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'console';
import { SuperAdminServiceService } from '../superAdminService/super-admin-service.service';

@Component({
  selector: 'app-super-admindashboard',
  templateUrl: './super-admindashboard.component.html',
  styleUrls: ['./super-admindashboard.component.css'],
})
export class SuperAdmindashboardComponent implements OnInit {
  adminData: any;
  adminList: any;
  adminLimit = 5;
  request: any;
  array: any = [];
  rejectedList: any;
  limit = 9;
  constructor(private supS: SuperAdminServiceService,private router:Router) {}

  ngOnInit(): void {
    this.rejectList();
    this.getAdmin();
    let temp: any;
    this.supS.getDash().subscribe({
      next: (data) => {
        this.adminData = data;
        // console.log(this.adminData);
        this.request = this.adminData.listOfAdmins;
        for (let i of this.request) {
          this.array.push(false);
        }
      },
      error: (data) => console.log(data),
    });
  }

  accept(item: any, index: any) {
    const body = {
      emailId: item.emailId,
      fullName: item.fullName,
    };
    this.supS.adminAccept(body).subscribe((data) => console.log(data));
    this.remove(index);
    this.adminData.totalNumberOfAdmins++;
  }

  reject(item: any, index: any) {
    const body = {
      emailId: item.emailId,
    };
    this.supS.adminReject(body).subscribe((data) => console.log(data));
    this.remove(index);
    this.add(item, index);
  }

  toggle(i: any) {
    this.array[i] = !this.array[i];
  }

  remove(i: any) {
    this.request.splice(i, 1);
  }
  rejectList() {
    this.supS.admlist(this.limit).subscribe((data) => {
      this.rejectedList = JSON.parse(data);
      // console.log(this.rejectedList);
    });
  }

  getAdmin() {
    this.supS.removed(this.adminLimit).subscribe((data) => {
      this.adminList = JSON.parse(data);
      console.log(this.adminList);
    });
  }

  add(item: any, index: any) {
    this.rejectedList.splice(index, 0, item);
  }
  onScrolling(event: any) {
    console.log(event);
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.limit = this.limit + 4;
      console.log(this.limit);

      this.rejectList();
    }
  }
  onScrollingAdmin(event: any) {
    console.log(event);
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      this.adminLimit = this.adminLimit + 4;
      console.log(this.adminLimit);
      this.getAdmin();
    }
  }
  logout() {
    this.router.navigateByUrl('/');
    sessionStorage.removeItem('token');
  }
}
