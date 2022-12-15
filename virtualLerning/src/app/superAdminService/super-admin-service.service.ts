import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SuperAdminServiceService {
  url =
    'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/superAdmin/';
  constructor(private http: HttpClient) {}

  getDash() {
    return this.http.get(this.url + 'admins');
  }
}

