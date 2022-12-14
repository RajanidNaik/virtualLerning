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
      { observe: 'response' }
    );
  }
  resetPass(body: any) {
    return this.http.post(
      'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/send',
      body,
      { observe: 'response' }
    );
  }
  otp(body: any) {
    return this.http.post(
      'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/verify',
      body,
      { observe: 'response' }
    );
  }
  resend(body: any) {
    return this.http.post(
      'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/resend',
      body,
      { observe: 'response' }
    );
  }

  reset(body: any) {
    return this.http.put(
      'http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/resetPassword',
      body,
      { observe: 'response' }
    );
  }
}
