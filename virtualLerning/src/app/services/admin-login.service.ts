import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
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
    return this.http.post(`${baseUrl}/admin/send`, body, {
      observe: 'response',
    });
  }
  otp(body: any) {
    return this.http.post(`${baseUrl}/admin/verify`, body, {
      observe: 'response',
    });
  }
  resend(body: any) {
    console.log(body);
    
    return this.http.post(`${baseUrl}/admin/resend`, body, {
      observe: 'response',
    });
  }

  reset(body: any) {
    return this.http.put(`${baseUrl}/admin/resetPassword`, body, {
      observe: 'response',
    });
  }
  signUp(body: any) {
    return this.http.post(`${baseUrl}/admin/register`, body, {
      observe: 'response',
    });
  }
}
