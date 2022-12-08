import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminLoginService {
  constructor(private http: HttpClient) {}

  adminLogin(body: any) {
    return this.http.post(
      'http://admin-env.eba-mh8pph25.ap-south-1.elasticbeanstalk.com/admin/login',
      body,
      { responseType: 'text' }
    );
  }
}
