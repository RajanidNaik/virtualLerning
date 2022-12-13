import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  constructor(private http: HttpClient) {}
  login =
    'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin';
  adminLogin(body: any) {
    return this.http.put(
      'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/login',
      body,
      { responseType: 'text' }
    );
  }
  resetPass(body: any) {
    return this.http.post(
      'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/send',
      body,{ observe:"response"}
    );
  }
}
