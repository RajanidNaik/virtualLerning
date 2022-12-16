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
    return this.http.put(this.login+'/login',
      body,
      { observe: 'response' }
    );
  }
  resetPass(body: any) {
    return this.http.post(this.login +'/send', body, { observe: 'response' });
  }
  otp(body: any) {
    return this.http.post(this.login +'/verify', body, {
      observe: 'response',
    });
  }
  resend(body: any) {
    return this.http.post(this.login +'/register', body, {
      observe: 'response',
    });
  }

  reset(body: any) {
    return this.http.put(this.login +'/resetPassword', body,{
      observe: 'response',
    });
  }
  signUp(body: any) {
    return this.http.post(this.login +'/register', body, {
      observe: 'response',
    });
  }
}
